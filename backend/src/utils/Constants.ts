import { Actions, Step } from "@prisma/client";

import { addListener, login, waitListener, firePageMethod, Tester } from "src/Tester";

// This map describes which function an action should call, every single
// actions that can be stored in the DB (Actions type) must be a key with a value.
export const ACTIONS_TO_FUNCTIONS: { [key in Actions]: Function } = {
    login: async (step: Step, tester: Tester) => await login(step, tester),
    tap: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    type: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    goto: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    click: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    focus: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    hover: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    goBack: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    reload: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    select: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    goForward: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    waitListener: async (step: Step, tester: Tester) => await waitListener(step, tester),
    setGeolocation: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    waitForNavigation: async (step: Step, tester: Tester) => await addListener(step, tester),
    waitForTimeout: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
    waitForNetworkIdle: async (step: Step, tester: Tester) => await addListener(step, tester),
    waitForSelector: async (step: Step, tester: Tester) => await firePageMethod(step, tester),
};