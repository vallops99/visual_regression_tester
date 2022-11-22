import { waitFor, screen } from "@testing-library/react";

export const assertModalText = async (text: string) => {
    await waitFor(() => screen.getByTestId("modalError"));

    expect(
        screen.getByTestId("modalError")
    ).toHaveTextContent(text);
};