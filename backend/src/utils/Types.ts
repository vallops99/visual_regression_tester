import { Prisma, Step } from "@prisma/client";

import type { Tester } from "src/Tester";

export type BaseTest = {
    name: string;
    isLogin: boolean;
    orderNumber: number;
    needsLogin?: boolean;
    
    steps: Step[];
};

export type Test = BaseTest & {
    done?: boolean;
    pending?: boolean;
    hasDiff?: boolean;
    notified?: boolean;

    error: string | null;
    diffPath: string | null;
    imagePath: string | null;
    lastImagePath: string | null;
}

export type TestConfig = {
    name: string;
    tester: Tester;
    steps: {
        args: Prisma.JsonValue;
        action: string;
    }[];
};

export interface IfilteringOptions {
    showable?: boolean;
    notifiable?: boolean;
}