import styled from "styled-components";

import { Img } from "..";

export const TestBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    height: 400px;

    position: relative;

    padding: 1rem;
    border: 1px solid var(--super-light-grey);
    border-radius: .5rem;

    box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 30%);
`;

export const TestImageContainer = styled.div`
    width: 380px;
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

export const ParagraphNoDiff = styled.p`
    width: 100%;
    text-align: center;
`;