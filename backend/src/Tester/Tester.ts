import fs from "fs";
import { PNG } from "pngjs";
import puppeteer from "puppeteer";
import pixelmatch from "pixelmatch";
import { Step } from "@prisma/client";

import { BaseTest, Test } from "src/utils";
import { execTest, prepareTest } from "src/Tester";
import {
    getTestQuery,
    getTestsQuery,
    getTesterQuery,
    editTestsQuery,
    deleteStepQuery,
    createTestQuery,
    deleteTestQuery,
    updateTestsQuery,
    reorderStepsQuery,
    getLastStepIdQuery,
    updateOrCreateStepQuery,
    getLoginTest,
} from "src/Queries";

export class Tester {
    id!: number;

    loginTest!: Test | null;

    threshold!: number;

    error?: string;
    appUrl!: string;
    imagesFolder!: string;

    currentPage!: puppeteer.Page;
    
    listenersOn: { [stepId: number]: any } = {};

    isLoggedIn = false;
    areTestsDone = true;
    testsRestarted = false;

    readonly basePath = '/usr/src/app/static';
    readonly browserOpts = {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    };

    constructor() {
        getTesterQuery().then(tester => {
            if (!tester) return;

            getLoginTest(tester.id).then(loginTest => {
                this.loginTest = loginTest;
            });

            this.id = tester.id;
            this.appUrl = tester.appUrl;
            this.threshold = tester.threshold;
            this.imagesFolder = tester.imagesFolder;

            fs.mkdir(`${this.basePath}/${this.imagesFolder}`, () => {});

        });
    }

    async getTests(notifiable?: boolean) {
        return await getTestsQuery(this.id, notifiable);
    }

    async getTest(testName: string) {
        return await getTestQuery(this.id, testName);
    }

    async createTest(test: BaseTest) {
        await createTestQuery(this.id, test)
    }
    
    async updateTests(tests: Test[]) {
        return await updateTestsQuery(tests);
    }

    async editTests(tests: Test[]) {
        return await editTestsQuery(tests)
    }

    async updateOrCreateStep(step: Step) {
        return await updateOrCreateStepQuery(step);
    }

    async reorderSteps(steps: Step[]) {
        return await reorderStepsQuery(steps);
    }

    async deleteStep(stepObjId: { id: number }) {
        return await deleteStepQuery(stepObjId);
    }

    async deleteTest(testObjName: { name: string }) {
        return await deleteTestQuery(testObjName);
    }

    async getLastStepId() {
        return await getLastStepIdQuery();
    }

    async saveTests({ tests, accept }: { tests: Test[], accept: boolean }) {
        const fileErrorHandler = (error: NodeJS.ErrnoException | null) => {
            console.error("Cannot make action over file, error: " + error);
        };
        for (const test of tests) {
            const fullDiffPath = `${this.basePath}/${test.diffPath}`;
            const fullImagePath = `${this.basePath}/${test.imagePath}`;
            const fullLastImagePath = `${this.basePath}/${test.lastImagePath}`;

            if (!this.doesPathsExist([fullDiffPath, fullImagePath, fullLastImagePath])) {
                test.error = 'One of the three images does not exist, try launching the tests again';
                continue;
            }

            fs.unlink(fullDiffPath, fileErrorHandler);

            test.hasDiff = false;
            test.diffPath = null;
            test.lastImagePath = null;

            if (!accept) {
                fs.unlink(fullLastImagePath, fileErrorHandler);
            } else {
                const currentHash = Date.now();
                test.imagePath = `${this.imagesFolder}/${test.name}/${test.name}_${currentHash}.png`;

                fs.unlink(fullImagePath, fileErrorHandler);

                fs.rename(fullLastImagePath, `${this.basePath}/${test.imagePath}`, fileErrorHandler);
            }
        }

        await updateTestsQuery(tests);
    }

    async launchTests() {
        console.log('Regression tests started');

        this.isLoggedIn = false;
        this.areTestsDone = false;

        const tests = await this.getTests();

        tests.forEach(test => prepareTest(test, this));

        await updateTestsQuery(tests);

        console.log('launching browser...');
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: this.browserOpts,
            args: [
                '--no-sandbox'
            ]
        });

        try {
            this.currentPage = await browser.newPage();

            console.log('Loading page...');
            await this.currentPage.goto(
                this.appUrl,
                {
                    timeout: 60000,
                    waitUntil: 'networkidle0'
                }
            );
        } catch(error: any) {
            this.error = error;
        }

        let testNumber = 0;
        for (const test of tests) {
            // If tests has been restarted break this batch
            if (this.testsRestarted) break;
            // Propagate tester error to all tests
            if (this.error) {
                test.done = true;
                test.pending = false;
                test.hasDiff = false;
                test.error = this.error;
                continue;
            }

            testNumber += 1.

            console.log(`Test n.${testNumber}`);
            console.log(`Screenshot will be uploaded at ${this.basePath}/${this.imagesFolder} under name ${test.name}.png`);

            await execTest(test, this);

            console.log('Page screenshot done, moving on...');

            updateTestsQuery([test]);
        }

        await browser.close();

        this.areTestsDone = !this.testsRestarted;
        this.testsRestarted = false;

        console.log('done');
    }

    async compareScreenshots(firstImagePath: string, secondImagePath: string): Promise<{numPixelDiff: number, imgBuffer: Buffer}> {
        const threshold = this.threshold;

        // Workaround to await image reading and still have a return value of the function.
        // Otherwise we should rely on returning a Promise and relying on its resolve function,
        // but that will break TS' linter by don't having a proper return value;
        let flagPromiseResolver: (value: unknown) => void;
        const flagPromise = new Promise((resolve) => {
            flagPromiseResolver = resolve;
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