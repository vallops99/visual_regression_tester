import styled from "styled-components";

import { Img } from "../../features";

export const TestWrapperDiv = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export const ImageDetail = styled.div`
    margin: 1rem;
`;

export const ImgStyled = styled(Img)`
    width: 600px;
`;

export const ErrorTestDetailContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
`;

export const ErrorTestDetail = styled.div`
    width: fit-content;

    padding: 1rem;
    margin: 1rem;

    border: 2px solid var(--error);

    font-weight: bold;
`;

export const TestDetailHeader = styled.h2`
    width:100%;
    margin: 2rem;
`;