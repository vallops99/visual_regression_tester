import { Step } from "src/utils";
import { Tester } from "./Tester";

export async function runSteps(steps: Step[], tester: Tester) {
    const result: { success: boolean, error: string | null } = {
        success: true,
        error: null
    };

    for (const step of steps) {
        console.log(`Making step ${step.action} with args ${JSON.stringify(step.args)}`);

        try {
            // Next line has been ignored because there were no way of letting TS accept it.
            // @ts-ignore
            await tester.currentPage[step.action](...step.args);
        } catch(err) {
            console.log(err);
            result.error =
                `Error while making step ${step.action} with args ${JSON.stringify(step.args)}`;

            result.success = false;

            break;
        }
    }

    return result
}