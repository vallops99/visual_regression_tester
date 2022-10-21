import styled from "styled-components";

export const Tests = styled.div`
    display: flex;
    flex-wrap: nowrap;

    width: 100%;

    margin: 1rem auto;
`;

export const TestsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    gap: 1rem;

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
`;