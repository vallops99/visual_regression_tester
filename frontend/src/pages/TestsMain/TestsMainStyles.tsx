import styled from "styled-components";

export const Tests = styled.div`
    width: 100%;

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

    :first-child {
        margin-top: 0;
    }
`;