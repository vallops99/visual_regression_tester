const fs = require('fs');
const PNG = require('pngjs').PNG;
const login = require('./login.js');
const puppeteer = require('puppeteer');
const jsonTest = require('./tests.json');
const pixelmatch = require('pixelmatch');


module.exports.Tester = class Tester {
    constructor() {
        this.isLoggedIn = false;
        this.areTestsDone = true;
        this.restartTests = false;

        this.currentPage = null;
    
        this.basePath = '/usr/src/app/static';
        this.imagesFolder = 'test-images';

        this.jsonTests = jsonTest.tests;

        this.testsStatus = {};
        this.browserOpts = {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1
        };

        jsonTest.tests.forEach(test => {
            if (this.testsStatus[test.name]) {
                console.log('Two tests with the same name can not exist');
                return;
            }

            this.testsStatus[test.name] = {
                finished: false,
                pending: false,
                error: null
            };
        });
    }

    get tests() {
        const analyzedTests = [];

        this.jsonTests.forEach(test => {
            const analyzedTest = {
                name: test.name,
                imagePath: `/${this.imagesFolder}/${test.name}/${test.name}.png`,
                hasDiff: false
            };

            const possibleDiffPath = `/${this.imagesFolder}/${test.name}/diff.png`;
            const possibleLastImagePath = `/${this.imagesFolder}/${test.name}/${test.name}_last.png`;
            if (fs.existsSync(`${this.basePath}${possibleDiffPath}`)) {
                analyzedTest.hasDiff = true;
                analyzedTest.diffPath = possibleDiffPath;
                analyzedTest.lastImagePath = possibleLastImagePath;
            }

            analyzedTests.push(analyzedTest);
        });

        return analyzedTests;
    }

    set tests(imagesPath) {
        imagesPath.forEach(imagePath => {
            const fullPath = this.basePath + imagePath;
            if (!fs.existsSync(fullPath)) {
                console.log(`Image with path ${fullPath} does not exist`);
                return;
            }

            const pathSplitted = fullPath.split(/(_last|\.png)/);
            fs.renameSync(fullPath, `${pathSplitted[0]}.png`);
            fs.unlinkSync(`${pathSplitted[0].split('/').slice(0, -1).join('/')}/diff.png`);

            if (pathSplitted.length < 2) {
                fs.unlinkSync(`/usr/src/app/${pathSplitted[0]}_last.png`);
            }
        });
    }

    async launchTests() {
        console.log('Regression tests started');

        this.areTestsDone = false;

        this.jsonTests.forEach(test => {
            this.testsStatus[test.name].done = false;
            this.testsStatus[test.name].pending = true;
            this.testsStatus[test.name].notified = false;
        });

        const browser = await puppeteer.launch({
            defaultViewport: this.browserOpts,
        args: [
                '--no-sandbox',
                '--disable-web-security'
            ],
        executablePath: 'google-chrome-stable'
        });

        this.currentPage = await browser.newPage();

        this.addMethodsToPage();

        console.log('Loading page...');
        await this.currentPage.goto(
            jsonTest.appUrl,
            {
                timeout: 60000,
                waitUntil: 'networkidle0'
            }
        );

        if (jsonTest.domain) {
            await this.currentPage.evaluate((domain) => {
                Ext.sasConfig.endpoint = Ext.sasConfig.endpoint.replace('localhost', domain);
            }, jsonTest.domain);
        }

        for (let i=0; i < this.jsonTests.length; i++) {
            if (this.testsRestarted) break;

            const currentTest = this.jsonTests[i];
            const uploadTo = `${this.basePath}/${this.imagesFolder}/${currentTest.name}/`;

            fs.mkdirSync(uploadTo, { recursive: true });

            console.log(`Test n.${i + 1}`);
            console.log(`Screenshot will be uploaded at ${uploadTo} under name ${currentTest.name}.png`);

            if (currentTest.needsLogin && !this.isLoggedIn) {
                console.log('This test requires login');
                this.isLoggedIn = await login(jsonTest.loginSteps);
                if (!this.isLoggedIn) {
                    this.testsStatus[currentTest.name].done = true;
                    this.testsStatus[currentTest.name].pending = false;
                    this.testsStatus[currentTest.name].error = 'Error while trying to login, test aborted';
                    continue;
                }
            }

            let stepsSuccess = false;
            for (let j = 0; j < (currentTest.steps || []).length; j++) {
                stepsSuccess = await runStep(currentTest.steps[j]);
                if (!stepsSuccess) break;
            }

            // Skip this test in case of error
            if (!stepsSuccess) {
                this.testsStatus[currentTest.name].done = true;
                this.testsStatus[currentTest.name].pending = false;
                continue;
            }

            let image_suffix = '';
            let original_exists = false;
            if (fs.existsSync(`${uploadTo}${currentTest.name}.png`)) {
                image_suffix = '_last';
                original_exists = true;
            }

            await this.currentPage.screenshot({ path: `${uploadTo}${currentTest.name}${image_suffix}.png` });

            if (original_exists) {
                console.log('Comparing new screenshot with old one');
                await this.compareScreenshots(
                    `${uploadTo}${currentTest.name}.png`,
                    `${uploadTo}${currentTest.name}${image_suffix}.png`,
                    uploadTo
                );
            }

            this.testsStatus[currentTest.name].done = true;
            this.testsStatus[currentTest.name].pending = false;

            console.log('Page screenshot done, moving on...');
        }

        await browser.close();

        this.areTestsDone = !this.testsRestarted;
        this.testsRestarted = false;
        this.currentPage = null;

        console.log('done');
    }

    async runStep(step, testName) {
        let stepSuccess = true;

        console.log(`Making step ${step.action} with args ${JSON.stringify(step.args)}`);
        try {
            await this.currentPage[step.action](...step.args);

        } catch(err) {
            console.log(err);
            this.testsStatus[testName].error =
                `Error while making step ${step.action} with args ${JSON.stringify(step.args)}`;

            stepSuccess = false;
        }

        return stepSuccess;
    }

    async login(loginSteps) {
        let stepsSuccess = true;

        for (let i = 0; i < loginSteps.length; i++) {
            stepsSuccess = await runStep(loginSteps[i], 'login');
            if (!stepsSuccess) break;
        }

        return stepsSuccess;
    }

    compareScreenshots(firstImagePath, secondImagePath, uploadPath) {
        return new Promise((resolve, reject) => {
            const firstImage = fs.createReadStream(firstImagePath).pipe(new PNG).on('parsed', parseDone);
            const secondImage = fs.createReadStream(secondImagePath).pipe(new PNG).on('parsed', parseDone);

            let parsedImages = 0;
            function parseDone() {
                if (++parsedImages < 2) return;

                const { width, height } = firstImage;

                const diff = new PNG({ width, height });
                const numDiffPixels = pixelmatch(
                    firstImage.data,
                    secondImage.data,
                    diff.data,
                    width,
                    height,
                    { threshold: 0.1 }
                );

                if (numDiffPixels) {
                    fs.writeFileSync(`${uploadPath}diff.png`, PNG.sync.write(diff));
                    console.log('Difference file created');
                } else {
                    console.log('There are no differences');
                    fs.unlink(secondImagePath, () => {});
                }
                resolve();
            };
        });
    }
}