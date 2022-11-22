import { rest } from "msw";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { render, server } from "..";
import { TestDetail } from "../../pages";
import mockTestNoDiff from "../dataMock/mockTestNoDiff.json";
import mockTestNotRan from "../dataMock/mockTestNotRan.json";

test("Open inexistant test", async () => {
    server.use(
        rest.get("get-test/:name", (req, res, ctx) => {
            return res.once(
                ctx.status(404),
                ctx.json("Test not found")
            );
        }),
    );

    render(<TestDetail />, { url: "/inexistant-test", route: "/:testName" });

    await waitFor(() => screen.getByTestId("errorTestDetail"));

    expect(
        screen.getByTestId("errorTestDetail")
    ).toHaveTextContent("Something wrong happened, can't load the test requested");
});

test("Open test not ran yet", async () => {
    server.use(
        rest.get("get-test/:name", (req, res, ctx) => {
            return res.once(ctx.json(mockTestNotRan));
        }),
    );

    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getByTestId("TestDetailNotRanYet"));

    expect(
        screen.getByTestId("TestDetailNotRanYet")
    ).toHaveTextContent("Test has not ran yet.");
});

test("Open test", async () => {
    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getByTestId("testDetailHeader"));

    expect(
        screen.getByTestId("testDetailHeader")
    ).toHaveTextContent("CondaRepo");
});

test("Accept/Refuse test", async () => {
    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getByTestId("TestDetailAcceptNew"));

    server.use(
        rest.get("get-test/:name", (req, res, ctx) => {
            return res.once(ctx.json(mockTestNoDiff));
        }),
    );

    fireEvent.click(screen.getByTestId("TestDetailAcceptNew"));

    await waitFor(() => screen.getByTestId("TestDetailNoDiffHeader"));

    expect(
        screen.getByTestId("TestDetailNoDiffHeader")
    ).toHaveTextContent("Saved image");
});

test("Delete test", async () => {
    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getByTestId("TestDetailAcceptNew"));

    fireEvent.click(screen.getByTestId("TestDetailDeleteTest"));
});

test("Add step", async () => {
    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getByTestId("TestDetailNewImageHeader"));

    fireEvent.click(screen.getByTestId("StepsAddStep"));

    await waitFor(() => screen.getByTestId("StepComponentForm"));

    fireEvent.submit(screen.getByTestId("StepComponentForm"));

    // Should I expect something there?
});

test("Edit step", async () => {
    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getAllByTestId("StepComponentEditStep"));

    fireEvent.click(screen.getAllByTestId("StepComponentEditStep")[0]);

    await waitFor(() => screen.getByTestId("StepComponentForm"));

    fireEvent.submit(screen.getByTestId("StepComponentForm"));
});

test("Delete step", async () => {
    render(<TestDetail />, { url: "/CondaRepo", route: "/:testName" });

    await waitFor(() => screen.getAllByTestId("StepComponentDeleteStep"));

    fireEvent.click(screen.getAllByTestId("StepComponentDeleteStep")[0]);
});
