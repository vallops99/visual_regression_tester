import styled from "styled-components";

export const SelectStyled = styled.select`
    border: none;
    border-bottom: 1px solid var(--border-color);

    color: var(--text-color);
    background-color: transparent;

    :focus-visible {
        outline: none;
        border-color: var(--text-color);
    }
`;