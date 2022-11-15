import { Actions } from "@prisma/client";

import { addListener, login, waitListener, firePageMethod } from "src/Tester";

// This map describes which function an action should call, every single
// actions that can be stored in the DB (Actions type) must be a key with a value.
export const ACTIONS_TO_FUNCTIONS: { [key in Actions]: Function } = {
    login: login,
    tap: firePageMethod,
    type: firePageMethod,
    goto: firePageMethod,
    click: firePageMethod,
    focus: firePageMethod,
    hover: firePageMethod,
    goBack: firePageMethod,
    reload: firePageMethod,
    select: firePageMethod,
    goForward: firePageMethod,
    waitListener: waitListener,
    setGeolocation: firePageMethod,
    waitForNavigation: addListener,
    waitForTimeout: firePageMethod,
    waitForNetworkIdle: addListener,
    waitForSelector: firePageMethod,
};