import styled from "styled-components";

import { ColorType } from "../../utils";

export const ParagraphStyled = styled.p`
    text-align: center;
    color: var(--text-color);

    ${({ variant }: { variant?: ColorType}) => {
        if (!variant) return ``;

        return `
            color: var(--${variant});
        `;
    }}
`;