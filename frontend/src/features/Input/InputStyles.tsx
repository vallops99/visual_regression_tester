import styled from "styled-components";

export const InputStyled = styled.input`
    ${({ type }) => {
        switch(type) {
            case "checkbox":
                return `
                    margin-left: 0;
                `;
            case "text":
            case "number":
                return `
                    width: 100%;

                    border: none;
                    border-bottom: 1px solid var(--border-color);

                    color: var(--text-color);
                    background-color: transparent;

                    &:focus-visible {
                        outline: none;
                        border-bottom: 1px solid var(--text-color);
                    }
                `;
        }
    }}
`;