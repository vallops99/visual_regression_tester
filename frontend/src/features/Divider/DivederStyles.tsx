import styled from "styled-components";

export const Hr = styled.hr`
    width: 2px;
    min-width: 2px;
    min-height: 100%;

    border: 0;

    background-color: var(--border-color);

    ${({ orientation }: { orientation?: "vertical" | "horizontal" }) => {
        return orientation === "horizontal" &&
        `
            width: 100%;
            min-width: unset;
            min-height: 1px;
        `;
    }}
`;