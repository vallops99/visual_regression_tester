import type { Tester } from "src/Tester";

export type Step = {
    action: string;
    args: any[];
}

export type TestConfig = {
    name: string,
    steps: Step[],
    basePath: string,
    imagesFolder: string,
    testerInstance: Tester,
}