import { Prisma } from "@prisma/client";

import type {  Tester } from "src/Tester";

// type optionsObject = {
//     delay?: number;
//     timeout?: number;
//     idleTime?: number;
//     accuracy?: number;
//     latitude?: number;
//     longitude?: number;
//     clickCount?: number;

//     hidden?: boolean;
//     visible?: boolean;

//     referer?: string;

//     button?: MouseButton;

//     waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[]
// };

export type Test = {
    done?: boolean;
    pending?: boolean;
    hasDiff?: boolean;
    notified?: boolean;
    needsLogin?: boolean;

    name: string;
    error: string | null;
    diffPath: string | null;
    imagePath: string | null;
    lastImagePath: string | null;

    steps: Step[];
}

export type Step = {
    args: Prisma.JsonValue;
    action: string;
};


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