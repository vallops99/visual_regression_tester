import { rest } from "msw";
import { setupServer } from "msw/node";

import { store } from "../app/store";
import { apiSlice } from "../features";
import mockTest from "./dataMock/mockTestWithDiff.json";

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        dispatchEvent: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
    }),
});

export const server = setupServer(
    rest.post("/launch-tests", (req, res, ctx) => {
        return res(ctx.json({ message: "Tests started" }));
    }),

    rest.get("/get-notifications", (req, res, ctx) => {
        return res(ctx.json({
            areTestsDone: true,
		    testsToReload: ["CondaRepo"]
        }))
    }),

    rest.get("/get-tests", (req, res, ctx) => {
        return res(ctx.json({
            areInvalid: true,
            tests: [mockTest]
        }));
    }),

    rest.get("/get-test/:name", (req, res, ctx) => {
        return res(ctx.json(mockTest));
    }),

    rest.put("/set-tests", (req, res, ctx) => {
        return res(ctx.json({ msg: "Test updated" }));
    }),

    rest.post("/create-test", (req, res, ctx) => {
        return res(ctx.json({ msg: "Test created" }));
    }),

    rest.delete("/delete-test", (req, res, ctx) => {
        return res(ctx.json({ msg: "Test deleted" }));
    }),

    rest.post("/set-step", (req, res, ctx) => {
        return res(ctx.json({ msg: "Step edited/created" }));
    }),

    rest.put("/reorder-steps", (req, res, ctx) => {
        return res(ctx.json({ msg: "Step reordered" }));
    }),

    rest.delete("/delete-step", (req, res, ctx) => {
        return res(ctx.json({ msg: "Step deleted" }));
    }),

    rest.get("/get-last-step-id", (req, res, ctx) => {
        return res(ctx.json(1));
    }),
)
  
beforeAll(() => server.listen())
afterEach(() => {
    store.dispatch(apiSlice.util.resetApiState());
    server.resetHandlers();
})
afterAll(() => server.close())