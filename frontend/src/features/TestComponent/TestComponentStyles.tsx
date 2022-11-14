import styled from "styled-components";

import { Img } from "..";

export const TestBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    min-height: 400px;
    width: 380px;

    position: relative;

    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: .5rem;

    box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 30%);
`;

export const TestBodyContainer = styled.div`
    margin-bottom: .5rem;
`;

export const TestImageContainer = styled.div`
    width: 100%;
    height: 210px;
`;

export const TestImage = styled(Img)`
    width: 100%;
    height: 100%;
`;

export const TestActions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    margin: 0 1rem;
`;

export const TestButtonConfirmations = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

export const TestTitle = styled.h3`
    color: var(--text-color);
`;

export const ShowLink = styled.a`
    margin: .5rem;

    color: var(--link);

    &:visited {
        color: var(--link-visited);
    }
`;