import styled from "styled-components";

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
    
    width: 100%;
    height: 100%;

    margin: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 10;

    ${({ variant }: { variant: "viewport" | "default"}) => {
        if (variant === "viewport") {
            return `
                position: fixed;
                left: 0;
                top: 0;

                width: 100vw;
                height: 100vh;
            `;
        }
        return ``;
    }}
`;

export const LdsRing = styled.div`
    display: inline-block;

    position: relative;

    width: 80px;
    height: 80px;

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const LdsRingInner = styled.div`
    display: block;

    position: absolute;

    width: 64px;
    height: 64px;

    box-sizing: border-box;

    margin: 8px;
    border: 8px solid #2f2f2f;
    border-radius: 50%;
    border-color: #2f2f2f transparent transparent transparent;

    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    &:nth-child(1) {
        animation-delay: -0.45s;
    }

    &:nth-child(2) {
        animation-delay: -0.3s;
    }

    &:nth-child(3) {
        animation-delay: -0.15s;
    }
`;