import styled from "styled-components";

import { Img } from "..";
import { ButtonStyled } from "../Button/ButtonStyles";

export const ButtonContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    display: none;
    justify-content: center;
    align-items: center;

    z-index: 2;
    background-color: rgba(0, 0, 0, .1);

    ${ButtonStyled} {
        width: 200px;
    }
`;

export const ImgButtonContainer = styled.div`
    max-width: 600px;

    position: relative;

    padding: 0.5rem;
    border: 2px solid var(--${props => props.color});
    border-radius: 0.25rem;

    &:hover > ${ButtonContainer} {
        display: flex;
    }
`;

export const ImgStyled = styled(Img)`
    width: 100%;
`;