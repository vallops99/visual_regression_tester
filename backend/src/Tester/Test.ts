import fs from "fs";

import { Test } from "src/utils";
import { runSteps, Tester } from "src/Tester";

export function prepareTest(test: Test, tester: Tester) {
    test.done = false;
    test.pending = true;
    test.notified = false;

    test.error = null;

    fs.mkdir(`${tester.basePath}/${tester.imagesFolder}/${test.name}`, () => {});

    const diffPathExists = test.diffPath && fs.existsSync(`${tester.basePath}/${test.diffPath}`);
    const imagePathExists = test.imagePath && fs.existsSync(`${tester.basePath}/${test.imagePath}`);
    const lastImagePathExists = test.lastImagePath && fs.existsSync(`${tester.basePath}/${test.lastImagePath}`);

    if (!diffPathExists) test.diffPath = null;
    if (!imagePathExists) test.imagePath = null;
    if (!lastImagePathExists) test.lastImagePath = null;
}

export function hasError(test: Test) {
    return !!test.error;
}

export async function execTest(test: Test, tester: Tester) {
    const testSessionHash = Date.now();
    const uploadTo = `${tester.basePath}/${tester.imagesFolder}/${test.name}`;

    for (const file of fs.readdirSync(uploadTo)) {
        if (!(
            file.includes('_last') ||
            file.includes('diff')
        )) continue;

        fs.unlink(`${uploadTo}/${file}`, (err) => {
            if (err) console.log('Error deleting: ' + file);
        });
    }

    if (test.needsLogin && !tester.isLoggedIn) {
        console.log('This test requires login');

        const loginTest = await tester.login();

        if (loginTest && hasError(loginTest)) {
            test.done = true;
            test.pending = false;
            test.error = `Error while trying to login, test aborted (${loginTest.error})`;

            return;
        }

        tester.isLoggedIn = true;
    }

    const stepResult = await runSteps(test.steps, tester);

    // Skip this test in case of error
    if (!stepResult.success) {
        test.done = true;
        test.pending = false;
        test.hasDiff = false;
        test.error = stepResult.error;

        return;
    }

    let currentFileName = `${test.name}_${testSessionHash}`;
    if (test.imagePath) currentFileName = `${currentFileName}_last`;

    await tester.currentPage.screenshot({ path: `${uploadTo}/${currentFileName}.png` });

    if (test.imagePath) {
        console.log('Comparing new screenshot with old one...');
        await tester.compareScreenshots(
            `${tester.basePath}/${test.imagePath}`,
            `${uploadTo}/${currentFileName}.png`,
        ).then(({ numPixelDiff, imgBuffer }) => {
            if (!!numPixelDiff) {
                fs.writeFileSync(`${uploadTo}/diff_${testSessionHash}.png`, imgBuffer);

                test.hasDiff = true;
                test.lastImagePath = `${tester.imagesFolder}/${test.name}/${currentFileName}.png`;
                test.diffPath = `${tester.imagesFolder}/${test.name}/diff_${testSessionHash}.png`;

                console.log('Difference file created');
            } else {
                console.log('There are no differences');

                test.hasDiff = false;
                fs.unlink(`${uploadTo}/${currentFileName}.png`, () => {});
            }
        });
    } else {
        test.hasDiff = false;
        test.imagePath = `${tester.imagesFolder}/${test.name}/${currentFileName}.png`;
    }

    test.done = true;
    test.pending = false;
}