import styled from "styled-components";

export const TestsMainContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 6rem);

    display: flex;
    flex-direction: column;

    flex-wrap: nowrap;
`;

export const Tests = styled.div`
    width: 100%;
    min-height: calc(100vh - 6rem);

    display: flex;
    flex-wrap: nowrap;

    padding: 1rem 0;
`;

export const TestsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    gap: 1rem;
    margin: 0 1rem;

    width: 100%;
    height: 100%;
`;

export const UtilsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: sticky;
    top: 0; 

    width: fit-content;
    height: fit-content;
    min-width: 185px;

    padding: 0 .5rem;

    :first-child {
        margin-top: 0;
    }
`;

export const DividerContainer = styled.div`
    height: fit-content;
    width: 50%;
`;

export const CreateTestContainer = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;

    width: 50px;
    height: 50px;
    min-height: 50px;

    padding: 1rem;
`;

export const CreateTest = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 2px solid var(--success-d);
    border-radius: 100%;

    background-color: var(--success);

    cursor: pointer;

    &:hover {
        background-color: var(--success-d);
    }
`;

export const Cross = styled.span`
    font-weight: bold;
    color: white;
`;

export const ErrorTestDetailContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    color: var(--text-color);
`;

export const ErrorTestDetail = styled.div`
    width: fit-content;

    padding: 1rem;
    margin: 1rem;

    border: 2px solid var(--error);

    font-weight: bold;
`;