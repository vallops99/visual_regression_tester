import styled from "styled-components";

import { Img } from "..";

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
`;

export const ImgButtonContainer = styled.div`
    width: 600px;

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