import styled from "styled-components";

import { ButtonStyled } from "../../features/Button/ButtonStyles";
import { StepContainer } from "../../features/Steps/StepsStyles";

export const TestCreateContainer = styled.div`
    max-width: 100%;
    height: 100%;
`;

export const TestCreateSplitter = styled.div`
    max-width: 100%;

    display: flex;
    flex-wrap: nowrap;

    padding: 1rem;
`;

export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
`;

const commonInputContainer =`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    width: 50%;

    margin: 1rem 0;
`;

export const InputContainer = styled.div`
    ${commonInputContainer};
`;

export const StepListContainer = styled.ul`
    ${commonInputContainer};

    padding: 0;

    list-style-type: none;

    ${StepContainer} {
        width: 100%;
    }
`;

export const StepsHeader = styled.div`
    position: relative;
    
    width: 50%;
    height: fit-content;

    margin-top: 1rem;

    ${ButtonStyled} {
        position: absolute;
        top: 1px;
        right: 0;

        width: 2rem;
        height: 16px;

        border-radius: 100%;

        margin-right: 1rem;

        background-color: var(--background-color);
    }
`;

export const UpperDividerText = styled.span`
    position: absolute;
    top: -2px;
    left: 10%;

    padding: 0 1rem;

    color: var(--text-color);
    background-color: var(--background-color);
`;

export const SubmitContainer = styled.div`
    position: sticky;
    top: 5.5rem;
    right: 0;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    min-width: 185px;
    height: calc(100vh - 6rem);
`;