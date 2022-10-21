import styled from "styled-components";

import { DividerProps } from "./Divider";

export const Hr = styled.hr`
    width: 2px;
    min-height: 100%;

    border: 0;

    background-color: var(--super-light-grey);

    ${({ orientation }: DividerProps) => {
        return orientation === "horizontal" &&
        `
            width: 100%;
            min-height: 2px;
        `;
    }}
`;