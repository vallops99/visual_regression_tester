import { DARK_THEME, LIGHT_THEME, ACTIONS_INPUTS_MAP, buttonOptionsValues, waitUntilValues } from "./";

export type BaseTest = {
    name: string;

    isLogin: boolean;
    needsLogin: boolean;

    steps: Step[];
};

export type Test = BaseTest & {
    imagePath: string;
    createdAt: string;

    error?: string;
    diffPath?: string;
    lastImagePath?: string;
    
    orderNumber: number;
    
    done: boolean;
    pending: boolean;
    hasDiff: boolean;
    notified: boolean;
}

export type ArgAsObject = {
    hidden?: boolean;
    visible?: boolean;

    id?: number;
    delay?: number;
    number?: number;
    timeout?: number;
    idleTime?: number;
    accuracy?: number;
    latitude?: number;
    longitude?: number;
    clickCount?: number;

    waitUntil?: typeof waitUntilValues[number];
    button?: typeof buttonOptionsValues[number];
};

export type Actions = keyof typeof ACTIONS_INPUTS_MAP;
export type Arg = string | ArgAsObject;

export type Step = {
    id: number;
    args: Arg[];
    isNew: boolean;
    action: Actions;
};

export type AddStepType = Step & { testId: string };

export type TestsReturnType = {
    tests: Test[];
    areInvalid: boolean;
};

export type GetNotificationsReturnType = {
    areTestsDone: boolean;
    testsToReload: string[];
};

export type GetLastStepIdReturnType = number;

export type SetTestsParam = {
    tests: Test[];
    accept: boolean;
};

export type ColorType = "default" | "success" | "error";

export type Theme = typeof LIGHT_THEME | typeof DARK_THEME;