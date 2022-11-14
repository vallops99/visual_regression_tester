import styled from "styled-components";

import { Img } from "../../features";

export const TestDetailContainer = styled.div`
    position: relative;
    width: 100%;
    min-height: calc(100vh - 6rem);
`;

export const TestSplitter = styled.div`
    width: 100%;

    display: flex;
    flex-wrap: nowrap;

    padding: 1rem 0;
`;

export const TestWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
    height: 100%;
`;

export const ImageDetail = styled.div`
    margin: 0 1rem 1rem 1rem;
`;

export const ImgStyled = styled(Img)`
    width: 100%;
    max-width: 600px;
    min-width: 350px;
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

export const TestDetailHeader = styled.h2`
    width: 100%;

    margin: 0 1rem 1rem 1rem;

    color: var(--text-color);
`;

export const ImageDetailDescription = styled.h3`
    margin: 0 1rem 1rem 1rem;

    color: var(--text-color);
`;

export const DeleteTestContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    padding: .3rem 1rem;
`;