import styled from "styled-components";

import { Link } from "react-router-dom";

export const MainContainer = styled.div`
    width: 100%;
    min-height: 100vh;


    display: flex;
    flex-direction: column;
`;

export const NavbarNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-height: 4rem;

    background-color: var(--primary-color);
`;

export const NavbarSide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: 100%;

    padding: 0 1rem;
`;

export const NavbarLinkContainer = styled.div`
    width: fit-content;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 1rem;
`;

export const NavbarLink = styled(Link)`
    text-decoration: none;

    color: var(--text-color);

    &:hover {
        color: var(--text-color-hover);
    }

    ${({ variant="default" }: { variant?: "default" | "logo" }) => {
        if (variant === "logo") {
            return `
                font-weight: bold;
            `;
        }
        return ``;
    }}
`;