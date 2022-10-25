import styled from "styled-components";

export const ParagraphStyled = styled.p`
    text-align: center;
    color: var(--text-color);

    ${({ variant }: { variant?: "success" | "error"}) => {
        if (!variant) return ``;

        return `
            color: var(--${variant});
        `;
    }}
`;