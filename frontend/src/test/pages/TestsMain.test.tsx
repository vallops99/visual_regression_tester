import { rest } from "msw";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import { render } from "..";
import { server } from "../MockServer";
import { TestsMain } from "../../pages";
import { assertModalText } from "../utils";
import mockTestError from "../dataMock/mockTestError.json";
import mockTestNoDiff from "../dataMock/mockTestNoDiff.json";

test("Launch tests server error", async () => {
    server.use(
        rest.post("/launch-tests", (req, res, ctx) => {
            return res.once(ctx.status(500));
        }),
    );

    render(<TestsMain />);

    await fireEvent.click(screen.getByText("Launch tests"));

    await assertModalText("The server has not been able to launch the tests, error is the following:");
});

test("Get tests server error", async () => {
    server.use(
        rest.get("/get-tests", (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ error: "mocked up error" })
            );
        }),
    );

    render(<TestsMain />);

    await waitFor(() => screen.getByTestId("errorTestsMain"));

    expect(
        screen.getByTestId("errorTestsMain")
    ).toHaveTextContent("Something wrong happened, can not load the tests");
});

test("Test execution error", async () => {
    server.use(
        rest.get("/get-tests", (req, res, ctx) => {
            return res.once(ctx.json({
                areInvalid: true,
                tests: [mockTestError]
            }))
        }),
    );

    render(<TestsMain />);

    await waitFor(() => screen.getByTestId("singleTestError"));

    expect(
        screen.getByTestId("singleTestError")
    ).toHaveTextContent("Test error, Show in depth to know more");
});

test("handles launch tests", async () => {
    render(<TestsMain />);

    await fireEvent.click(screen.getByText("Launch tests"));

    await waitFor(() => screen.getByTestId("testTitle"));

    expect(
        screen.getByTestId("testTitle")
    ).toHaveTextContent("CondaRepo");
});

test("accept/refuse all tests", async () => {
    render(<TestsMain />);

    await waitFor(() => screen.getByTestId("acceptAllChanges"));

    server.use(
        rest.get("/get-tests", (req, res, ctx) => {
            return res.once(ctx.json({
                areInvalid: false,
                tests: [mockTestNoDiff]
            }));
        }),
    );

    await fireEvent.click(screen.getByTestId("acceptAllChanges"));

    await waitFor(() => screen.getByTestId("noDiffParagraph"));

    expect(
        screen.getByTestId("noDiffParagraph")
    ).toHaveTextContent("Test has found no differences");
});

test("accept/refuse one test", async () => {
    render(<TestsMain />);

    await waitFor(() => screen.getByTestId("acceptOneChange"));

    server.use(
        rest.get("/get-tests", (req, res, ctx) => {
            return res(ctx.json({
                areInvalid: true,
                tests: [mockTestNoDiff]
            }));
        }),
    );

    await fireEvent.click(screen.getByText("Accept changes"));

    await waitFor(() => screen.getByTestId("noDiffParagraph"));

    expect(
        screen.getByTestId("noDiffParagraph")
    ).toHaveTextContent("Test has found no differences");
});