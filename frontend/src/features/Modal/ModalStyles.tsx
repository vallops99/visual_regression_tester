import styled from "styled-components";

import { ColorType } from "../../utils";

export const ModalInnerContainer = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    width: 100%;
    height: fit-content;
`;

export const ModalTitle = styled.div`
    width: 100%;

    padding: .5rem;

    color: var(--text-color);

    background-color: var(--primary-color);

    box-sizing: border-box;

    font-weight: bold;
`;

export const ModalContainer = styled.div`
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);

    width: 400px;

    background-color: var(--background-color);

    border: 1px solid var(--border-color);

    border-radius: 0.25rem;
    box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 30%);
    
    overflow: hidden;
    z-index: 20;

    ${({ type }: { type: ColorType }) => {
        return `
            ${ModalTitle} {
                color: var(--${type});
            }
        `;
    }}
`;

export const ModalBody = styled.div`
    width: 100%;

    padding: .5rem;

    color: var(--text-color);

    box-sizing: border-box;
`;

export const ModalCloseButton = styled.div`
    position: absolute;
    top: .25rem;
    right: .25rem;
`;
