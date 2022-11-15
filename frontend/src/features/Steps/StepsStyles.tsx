import styled from "styled-components";
import { ButtonStyled } from "../Button/ButtonStyles";

export const StepsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: sticky;
    top: 0; 

    height: fit-content;
    width: 400px;
    min-width: 220px;

    
    margin: 2rem 1rem 0 1rem;
    padding: 0 .5rem;

    :first-child {
        margin-top: 0;
    }
`;

export const StepsTitle = styled.h3`
    color: var(--text-color);
`;

export const StepsList = styled.div`
    width: 100%;

    padding: 0;

    list-style-type: none;
`;

export const DraggableWrapper = styled.div`
    margin: 1rem 0;
`;

export const StepContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;

    border: 1px solid var(--border-color);
    border-radius: .5rem;

    color: var(--text-color);

    box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 30%);
`;

export const StepWrapper = styled.div`
    padding: 1.5rem 1rem 1.5rem 1rem;
`;

export const GrabIconContainer = styled.div`
    position: absolute;
    top: 0;
    margin-top: .2rem;

    ${ButtonStyled} {
        height: fit-content;
        width: fit-content;
    }

    right: 50%;
    transform: translateX(50%);
`;