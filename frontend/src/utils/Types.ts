export type Test = {
    name: string;
    imagePath: string;

    error?: string;
    diffPath?: string;
    lastImagePath?: string;

    done: boolean;
    pending: boolean;
    hasDiff: boolean;
}

export type TestsReturnType = {
    tests: Test[];
    areInvalid: boolean;
}

export type GetNotificationsReturnType = {
    areTestsDone: boolean;
};

export type SetTestsParam = {
    tests: Test[];
    accept: boolean;
};

export type ColorType = "default" | "success" | "error";