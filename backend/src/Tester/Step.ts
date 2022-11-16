import { Prisma, Step } from "@prisma/client";

import { Tester } from "./Tester";
import { execTest } from "./Test";
import { ACTIONS_TO_FUNCTIONS } from "src/utils";

export async function runSteps(steps: Step[], tester: Tester) {
    const result: { success: boolean, error: string | null } = {
        success: true,
        error: null
    };

    for (const step of steps) {
        console.log(`Making step ${step.action} with args ${JSON.stringify(step.args)}`);

        try {
            await ACTIONS_TO_FUNCTIONS[step.action]?.(step, tester);
        } catch(err) {
            result.error =
                `Error while making step ${step.action} with args ${JSON.stringify(step.args)}: ${err}`;

            result.success = false;

            break;
        }
    }

    return result;
}

export async function login(step: Step, tester: Tester) {
    if (!tester.loginTest) return undefined;

    if (!tester.isLoggedIn) return tester.loginTest;

    await execTest(tester.loginTest, tester);

    return tester.loginTest;
}

export async function waitListener(step: Step, tester: Tester) {
    const args = step.args as Prisma.JsonArray;
    const argObj = (args[0] as { id: number }).hasOwnProperty('id') && args[0] as { id: number };

    if (argObj) {
            await tester.listenersOn[argObj.id];
    } else {
        throw Error(`Step: ${step.action} is missing arg: { id: number }`);
    }
}

export async function addListener(step: Step, tester: Tester) {
    // Next line has been ignored because there were no way of letting TS accept it.
    // @ts-ignore
    tester.listenersOn[step.id] = tester.currentPage[step.action](...step.args);
}

export async function firePageMethod(step: Step, tester: Tester) {
    // If step.action is not a method of Puppeteer's Page class abort
    if (typeof tester.currentPage[step.action as keyof typeof tester.currentPage] !== 'function') {
        throw Error(`Can not execute ${step.action} because it is not a method of Puppeteer's Page class`);
    }

    // (TLDR; same as above) Next line has been ignored because there were no way of letting TS accept it.
    // @ts-ignore
    await tester.currentPage[step.action](...step.args);
}