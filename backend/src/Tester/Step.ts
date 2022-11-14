import { Prisma, Step } from "@prisma/client";

import { Tester } from "./Tester";
import { LISTENERS_ACTIONS, LISTENER_WAITER_ACTION } from "src/utils";

export async function runSteps(steps: Step[], tester: Tester) {
    const result: { success: boolean, error: string | null } = {
        success: true,
        error: null
    };

    for (const step of steps) {
        console.log(`Making step ${step.action} with args ${JSON.stringify(step.args)}`);

        try {
            const isListener = await checkAndAddListener(step, tester);
            const isListenerWaiter = await checkAndWaitForListener(step, tester);
            if (!isListenerWaiter && !isListener) {
                await firePageMethod(step, tester);
            }
        } catch(err) {
            console.error(err);
            result.error =
                `Error while making step ${step.action} with args ${JSON.stringify(step.args)}: ${err}`;

            result.success = false;

            break;
        }
    }

    return result;
}

async function checkAndWaitForListener(step: Step, tester: Tester) {
    const isListenerWaiter = step.action === LISTENER_WAITER_ACTION;

    const args = step.args as Prisma.JsonArray;
    const argObj = (args[0] as { id: number }).hasOwnProperty('id') && args[0] as { id: number };

    if (isListenerWaiter) {
        if (args.length && argObj) {
                await tester.listenersOn[argObj.id];
        } else {
            throw Error(`Step: ${step.action} is missing arg: { id: number }`);
        }
    }

    return isListenerWaiter;
}

async function checkAndAddListener(step: Step, tester: Tester) {
    const isListener = LISTENERS_ACTIONS.includes(step.action);
    if (isListener) {
        // Next line has been ignored because there were no way of letting TS accept it.
        // @ts-ignore
        tester.listenersOn[step.id] = tester.currentPage[step.action](...step.args);
    }

    return isListener;
}

async function firePageMethod(step: Step, tester: Tester) {
    // (TLDR; same as above) Next line has been ignored because there were no way of letting TS accept it.
    // @ts-ignore
    await tester.currentPage[step.action](...step.args);
}