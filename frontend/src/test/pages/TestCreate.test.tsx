import { rest } from "msw";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { render } from "..";
import { server } from "../MockServer";
import { TestCreate } from "../../pages";
import { assertModalText } from "../utils";

test("Create test server error", async () => {
    server.use(
        rest.post("/create-test", (req, res, ctx) => {
            return res(ctx.status(500));
        }),
    )

    render(<TestCreate />);

    fireEvent.change(screen.getByTestId("testCreateTextInput"), { target: { value: "ReactTest" } });
    fireEvent.click(screen.getByTestId("testCreateSubmit"));

    await assertModalText("The server has not been able to create the test, error is the following:");
});

test("Create test add a default step", async () => {
    render(<TestCreate />);

    // Using CondaRepo as test name in order to let the mocked server use the mocked data
    fireEvent.change(screen.getByTestId("testCreateTextInput"), { target: { value: "CondaRepo"} });
    expect(screen.getByTestId("testCreateTextInput")).toHaveValue("CondaRepo");

    fireEvent.click(screen.getByTestId("StepsAddStep"));

    expect(screen.getByTestId("StepsStepContainer")).toBeInTheDocument();
});