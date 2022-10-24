import styled from "styled-components";
import { ColorType } from "../../utils";

export const ButtonStyled = styled.button`
    height: 2.25rem;
    width: 150px;

    padding: 0 1rem;
    margin: 0.5rem;
    border: 1px solid var(--default-d);
    border-radius: 0.25rem;

    color: white;
    background-color: var(--default);

    cursor: pointer;

    :hover {
        background-color: var(--default-d);
    }

    ${({ colorType, variant }: { colorType: ColorType, variant?: String }) => {
        let outlinedStyle = "";
        if (variant === 'outlined') {
            outlinedStyle = `
                color: var(--${colorType}-d);
                border-width: 2px;
                background-color: transparent;

                &:hover {
                    color: white;
                }
            `;
        }

        return `
            border-color: var(--${colorType}-d);
            background-color: var(--${colorType});
            &:hover {
                background-color: var(--${colorType}-d);
            }
            ${outlinedStyle}
        `;
    }}
`;