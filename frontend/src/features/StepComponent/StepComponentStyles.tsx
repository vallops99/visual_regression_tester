import styled from "styled-components";

import { ButtonStyled } from "../Button/ButtonStyles";


export const StepComponentForm = styled.form`
    ${ButtonStyled} {
        height: 1.75rem;
        width: 100px;
        margin-left: 0;
    }
`;

export const ActionContainer = styled.div`
    display: flex;

    margin-bottom: 1rem;
`;

export const StepInfo = styled.div`
    display: flex;
    flex-wrap: nowrap;

    width: 100%;
    
    margin: .5rem 0;
`;

export const StepLabel = styled.span`
    white-space: nowrap;
    padding-right: .5rem;
`;

export const StepValue = styled.span`
    line-break: anywhere;
`;

const IconContainerBase =`
    position: absolute;
    top: 0;
    margin-top: .2rem;

    ${ButtonStyled} {
        height: fit-content;
        width: fit-content;
    }
`;

export const EditIconContainer = styled.div`
    ${IconContainerBase};

    right: 2rem;
`;

export const CloseIconContainer = styled.div`
    ${IconContainerBase};

    right: 0;
    margin-right: .3rem;
`;

export const DeleteIconContainer = styled.div`
    ${IconContainerBase};

    right: 0;

    margin-right: .3rem;
`;

export const ArgsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ArgInputContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin: .5rem;
`;

export const InputDescription = styled.span`
    font-size: .7rem;
    color: var(--text-color);
    margin-bottom: .5rem;
`;