import fs from "fs";
import { PNG } from "pngjs";
import puppeteer from "puppeteer";
import pixelmatch from "pixelmatch";

import { Test } from "src/Tester";
import { Step } from "src/utils";
import jsonTest from "src/tests.json";

export class Tester {
    isLoggedIn = false;
    areTestsDone = true;
    testsRestarted = false;

    currentPage!: puppeteer.Page;

    testsMap: { [key: string]: Test } = {};

    readonly imagesFolder = 'test-images';
    readonly basePath = '/usr/src/app/static';
    readonly threshold: number = jsonTest.threshold;
    readonly browserOpts = {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    };

    constructor() {

        jsonTest.tests.forEach(test => {
            if (this.testsMap[test.name]) {
                console.log('Two tests with the same name can not exist');
                return;
            }

            this.testsMap[test.name] = new Test({
                ...test,
                testerInstance: this,
                basePath: this.basePath,
                imagesFolder: this.imagesFolder,
            });
        });
    }

    get tests() {
        return Object.values(this.testsMap);
    }

    saveTests({ tests, accept }: { tests: Test[], accept: boolean }) {
        tests.forEach(test => {
            const testInstance = this.testsMap[test.name];
            const fullDiffPath = `${this.basePath}/${testInstance.diffPath}`;
            const fullImagePath = `${this.basePath}/${testInstance.imagePath}`;
            const fullLastImagePath = `${this.basePath}/${testInstance.lastImagePath}`;

            if (!this.doesPathsExist([fullDiffPath, fullImagePath, fullLastImagePath])) {
                testInstance.error = 'One of the three images does not exist, try launching the tests again';
                return;
            }

            fs.unlink(fullDiffPath, (err) => {
                if (err) console.log('cannot delete fullDiffPath: ' + fullDiffPath);
            });
            testInstance.hasDiff = false;
            testInstance.diffPath = undefined;
            testInstance.lastImagePath = undefined;

            if (!accept) {
                fs.unlink(fullLastImagePath, (err) => {
                    if (err) console.log('cannot delete fullLastImagePath: ' + fullLastImagePath);
                });
                return;
            }

            const currentHash = Date.now();
            testInstance.imagePath = `${this.imagesFolder}/${testInstance.name}/${testInstance.name}_${currentHash}.png`;

            fs.unlink(fullImagePath, (err) => {
                if (err) console.log('cannot delete fullImagePath: ' + fullImagePath);
            });

            fs.renameSync(fullLastImagePath, `${this.basePath}/${testInstance.imagePath}`);
        });
    }

    async launchTests() {
        console.log('Regression tests started');

        this.areTestsDone = false;

        Object.values(this.testsMap).forEach(test => test.prepareForTest());

        console.log('launching browser...');
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: this.browserOpts,
            args: [
                '--no-sandbox'
            ]
        });

        this.currentPage = await browser.newPage();

        console.log('Loading page...');
        await this.currentPage.goto(
            jsonTest.appUrl,
            {
                timeout: 60000,
                waitUntil: 'networkidle0'
            }
        );

        let testNumber = 0;
        for (const test of Object.values(this.testsMap)) {
            if (this.testsRestarted) break;

            testNumber += 1.

            console.log(`Test n.${testNumber}`);
            console.log(`Screenshot will be uploaded at ${this.basePath}/${this.imagesFolder} under name ${test.name}.png`);

            await test.launchTest();

            console.log('Page screenshot done, moving on...');
        }

        await browser.close();

        this.areTestsDone = !this.testsRestarted;
        this.testsRestarted = false;

        console.log('done');
    }

    async runStep(step: Step, test: Test) {
        let stepSuccess = true;

        console.log(`Making step ${step.action} with args ${JSON.stringify(step.args)}`);
        try {
            // Next line has been ignored because there were no way of letting TS accept it.
            // @ts-ignore
            await this.currentPage[step.action](...step.args);
        } catch(err) {
            console.log(err);
            test.error =
                `Error while making step ${step.action} with args ${JSON.stringify(step.args)}`;

            stepSuccess = false;
        }

        return stepSuccess;
    }

    async login(test: Test) {
        let stepsSuccess = true;

        for (const step of jsonTest.loginSteps) {
            stepsSuccess = await this.runStep(step, test);
            if (!stepsSuccess) break;
        }

        return stepsSuccess;
    }

    async compareScreenshots(firstImagePath: string, secondImagePath: string): Promise<{numPixelDiff: number, imgBuffer: Buffer}> {
        const threshold = this.threshold;

        // Workaround to await image reading and still have a return value of the function.
        // Otherwise we should rely on returning a Promise and relying on its resolve function,
        // but that will break TS' linter by don't having a proper return value;
        let flagPromiseResolver: (value: unknown) => void;
        let flagPromiseRejecter: (reason: unknown) => void;
        const flagPromise = new Promise((resolve, reject) => {
            flagPromiseResolver = resolve;
            flagPromiseRejecter = reject;
        });

        let parsedImages = 0;
        const parseDone = () => {
            if (++parsedImages < 2) return;
            flagPromiseResolver(true);;
        };

        const firstImageStream = fs.createReadStream(firstImagePath).pipe(new PNG).on('parsed', parseDone);
        const secondImageStream = fs.createReadStream(secondImagePath).pipe(new PNG).on('parsed', parseDone);

        await flagPromise;
        
        const { width, height } = firstImageStream;

        const imgStream = new PNG({ width, height });
        const results = {
            numPixelDiff: pixelmatch(
                firstImageStream.data,
                secondImageStream.data,
                imgStream.data,
                width,
                height,
                { threshold }
            ),

            imgBuffer: PNG.sync.write(imgStream),
        };

        return results;
    }

    doesPathsExist(paths: string[]) {
        return !paths.some(path => {
            return !fs.existsSync(path);
        });
    }
}