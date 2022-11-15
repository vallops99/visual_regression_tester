export const buttonOptionsValues = ["left", "right", "middle", "back", "forward"] as const;
export const waitUntilValues = ["load", "domcontentloaded", "networkidle0", "networkidle2"] as const;

export const ACTIONS_INPUTS_MAP = {
    tap: {
        default: [""],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to tap (selector)",
        }],
    },
    type: {
        default: ["", "", { number: 0 }],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to write in (selector)",
        }, {
            name: "text",
            type: "text",
            descr: "Text to write in element",
        }, {
            type: "object",
            values: [{
                name: "number",
                type: "number",
                descr: "Time to wait between key presses"
            }],
        }],
    },
    login: {
        default: [],
        config: [],
    },
    goto: {
        default: ["", { timeout: 30000, waitUntil: waitUntilValues[0] }],
        config: [{
            name: "URL",
            type: "text",
            descr: "URL to go",
        }, {
            type: "object",
            values: [{
                name: "timeout",
                type: "number",
                descr: "Timeout before throwing error",
            }, {
                name: "waitUntil",
                type: "select",
                values: waitUntilValues,
                descr: "Event to wait before goto completes",
            }],
        }],
    },
    click: {
        default: ["", { delay: 0, button: buttonOptionsValues[0], clickCount: 1 }],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to click on (selector)",
        }, {
            type: "object",
            values: [{
                name: "delay",
                type: "number",
                descr: "Time to wait before clicking",
            }, {
                name: "button",
                type: "select",
                values: buttonOptionsValues,
                descr: "Which mouse button to use",
            }, {
                name: "clickCount",
                type: "number",
                descr: "Number of click to do",
            }],
        }],
    },
    focus: {
        default: [""],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to focus on (selector)",
        }],
    },
    hover: {
        default: [""],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to hover (selector)",
        }],
    },
    goBack: {
        default: [{ timeout: 30000, waitUntil: waitUntilValues[0] }],
        config: [{
            type: "object",
            values: [{
                name: "timeout",
                type: "number",
                descr: "Time to wait before throwing error",
            }, {
                name: "waitUntil",
                type: "select",
                values: waitUntilValues,
                descr: "Event to wait before goBack completes",
            }],
        }],
    },
    reload: {
        default: [{ timeout: 30000, waitUntil: waitUntilValues[0] }],
        config: [{
            type: "object",
            values: [{
                name: "timeout",
                type: "number",
                descr: "Time to wait before throwing error",
            }, {
                name: "waitUntil",
                type: "select",
                values: waitUntilValues,
                descr: "Event to wait before reload completes",
            }],
        }],
    },
    select: {
        default: ["", ""],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to choose value from (selector)",
        }, {
            name: "values",
            type: "stringlist",
            descr: "Values to select from element",
        }],
    },
    goForward: {
        default: [{ timeout: 30000, waitUntil: waitUntilValues[0] }],
        config: [{
            type: "object",
            values: [{
                name: "timeout",
                type: "number",
                descr: "Time to wait before throwing error",
            }, {
                name: "waitUntil",
                type: "select",
                values: waitUntilValues,
                descr: "Event to wait before goForward completes",
            }],
        }],
    },
    waitListener: {
        default: [{ id: -1 }],
        config: [{
            type: "object",
            values: [{
                name: "id",
                type: "number",
                descr: "Id of step to wait (must be a listener)",
            }],
        }],
    },
    setGeolocation: {
        default: [{ accuracy: 50, latitude: 0, longitude: 0 }],
        config: [{
            type: "object",
            values: [{
                name: "accuracy",
                type: "number",
                descr: "Accuracy of geolocation data",
            }, {
                name: "latitude",
                type: "number",
                descr: "Latitude coordinate",
            }, {
                name: "longitude",
                type: "number",
                descr: "Longitude coordinate",
            }]
        }],
    },
    waitForTimeout: {
        default: [""],
        config: [{
            name: "time",
            type: "number",
            descr: "Time to wait",
        }],
    },
    waitForSelector: {
        default: ["", { hidden: false, timeout: 30000, visible: false }],
        config: [{
            name: "selector",
            type: "text",
            descr: "Element to wait (selector)",
        }, {
            type: "object",
            values: [{
                name: "hidden",
                type: "checkbox",
                descr: "Wait for not found or hidden",
            }, {
                name: "timeout",
                type: "number",
                descr: "Time to wait before throwing error",
            }, {
                name: "visible",
                type: "checkbox",
                descr: "Wait for element to be visible",
            }]
        }],
    },
    waitForNavigation: {
        default: [{ timeout: 30000, waitUntil: waitUntilValues[0] }],
        config: [{
            type: "object",
            values: [{
                name: "timeout",
                type: "number",
                descr: "Time to wait before throwing error",
            }, {
                name: "waitUntil",
                type: "select",
                values: waitUntilValues,
                descr: "Event to wait before waitForNavigation completes",
            }],
        }],
    },
    waitForNetworkIdle: {
        default: [{ idleTime: 500, timeout: 30000 }],
        config: [{
            type: "object",
            values: [{
                name: "idleTime",
                type: "number",
                descr: "After how much network is considered idle?",
            }, {
                name: "timeout",
                type: "number",
                descr: "Time to wait before throwing error",
            }],
        }],
    },
} as const;
