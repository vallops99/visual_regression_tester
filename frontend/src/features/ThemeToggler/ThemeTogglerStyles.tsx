import styled from "styled-components";

export const ThemeToggleSwitch = styled.div`
    position: relative;
    width: 2.5rem;
    height: 1.5rem;
`;

export const ThemeToggleLabel = styled.label`
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: var(--background-color);

    border-radius: 50px;

    cursor: pointer;
`;

export const ThemeToggleInput = styled.input`
    position: absolute;
    display: none;
`;

export const ThemeToggleSpan = styled.span`
    position: absolute;

    width: 100%;
    height: 100%;

    border-radius: 50px;

    transition: 0.3s;

    &::before {
        position: absolute;
        top: 50%;
        left: 5px;

        width: 10px;
        height: 10px;

        content: "";

        transform: translateY(-50%);

        border-radius: 50%;

        background-color: var(--secondary-color);

        transition: 0.3s;

        ${({ isChecked }: { isChecked: boolean }) => {
            return (isChecked) ? `transform: translate(22px, -50%);`: ``;
        }}
    }
`;