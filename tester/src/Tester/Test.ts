import fs from "fs";
import { Step, TestConfig } from "src/utils";

import type { Tester } from "src/Tester";

export class Test {
    testerInstance!: Tester;

    steps!: Step[];
    
    done?: boolean = false;
    pending?: boolean = false;
    hasDiff?: boolean = false;
    notified?: boolean = true;
    needsLogin?: boolean = false;

    name!: string;
    error?: string;
    basePath?: string;
    imagePath?: string;
    imagesFolder!: string;
    diffPath?: string | undefined;
    lastImagePath?: string | undefined;
    
    constructor(config: TestConfig) {
        Object.assign(this, config);

        // Check if some tests with the names provided already exist
        if (fs.existsSync(`${this.basePath}/${this.imagesFolder}/${this.name}`)) {
            const folderFiles = fs.readdirSync(`${this.basePath}/${this.imagesFolder}/${this.name}`);

            for (const file of folderFiles) {
                if (file.includes('diff')) {
                    this.diffPath = `${this.imagesFolder}/${this.name}/${file}`;
                } else if (file.includes('_last')) {
                    this.lastImagePath = `${this.imagesFolder}/${this.name}/${file}`;
                } else if (file.includes(this.name)) {
                    this.imagePath = `${this.imagesFolder}/${this.name}/${file}`;
                }
            }
        }

        this.done = !!this.imagePath;
        this.hasDiff = !!this.diffPath;
    }

    prepareForTest() {
        this.done = false;
        this.pending = true;
        this.notified = false;

        this.error = undefined;
    }

    async launchTest() {
        const tester = this.testerInstance;
        const testSessionHash = Date.now();
        const uploadTo = `${tester.basePath}/${tester.imagesFolder}/${this.name}`;

        fs.mkdirSync(uploadTo, { recursive: true });

        for (const file of fs.readdirSync(uploadTo)) {
            if (!(
                file.includes('_last') ||
                file.includes('diff')
            )) continue;

            fs.unlink(`${uploadTo}/${file}`, (err) => {
                if (err) console.log('Error deleting: ' + file);
            });
        }

        if (this.needsLogin && !tester.isLoggedIn) {
            console.log('This test requires login');

            tester.isLoggedIn = await tester.login(this);

            if (!tester.isLoggedIn) {
                this.done = true;
                this.pending = false;
                this.error = 'Error while trying to login, test aborted';

                return;
            }
        }

        let stepsSuccess = true;
        for (const step of (this.steps || [])) {
            stepsSuccess = await tester.runStep(step, this);
            if (!stepsSuccess) break;
        }

        // Skip this test in case of error
        if (!stepsSuccess) {
            this.done = true;
            this.pending = false;

            return;
        }

        let currentFileName = `${this.name}_${testSessionHash}`;
        if (this.imagePath) currentFileName = `${currentFileName}_last`;

        await tester.currentPage.screenshot({ path: `${uploadTo}/${currentFileName}.png` });

        if (this.imagePath) {
            console.log('Comparing new screenshot with old one...');
            await tester.compareScreenshots(
                `${tester.basePath}/${this.imagePath}`,
                `${uploadTo}/${currentFileName}.png`,
            ).then(({ numPixelDiff, imgBuffer }) => {
                if (!!numPixelDiff) {
                    fs.writeFileSync(`${uploadTo}/diff_${testSessionHash}.png`, imgBuffer);

                    this.hasDiff = true;
                    this.lastImagePath = `${this.imagesFolder}/${this.name}/${currentFileName}.png`;
                    this.diffPath = `${tester.imagesFolder}/${this.name}/diff_${testSessionHash}.png`;

                    console.log('Difference file created');
                } else {
                    console.log('There are no differences');
                    fs.unlink(`${uploadTo}/${currentFileName}.png`, () => {});
                }
            });
        } else {
            this.imagePath = `${this.imagesFolder}/${this.name}/${currentFileName}.png`;
        }

        this.done = true;
        this.pending = false;
    }

    toJSON() {
        return {
            name: this.name,
            done: this.done,
            error: this.error,
            pending: this.pending,
            hasDiff: this.hasDiff,
            diffPath: this.diffPath,
            imagePath: this.imagePath,
            lastImagePath: this.lastImagePath,
        }
    }
}