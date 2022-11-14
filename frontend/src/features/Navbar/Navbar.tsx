import { ThemeToggler } from "..";
import { Route, Routes } from "react-router";

import {
    TestsMain,
    TestDetail,
    TestCreate,
} from "../../pages";
import {
    NavbarNav,
    NavbarSide,
    NavbarLink,
    MainContainer,
    NavbarLinkContainer,
} from "./NavbarStyles";

export function Navbar() {
    return (
        <MainContainer>
            <NavbarNav>
                <NavbarSide>
                    <NavbarLinkContainer>
                        <NavbarLink to="/" variant="logo">
                            VRT
                        </NavbarLink>
                    </NavbarLinkContainer>
                </NavbarSide>
                <NavbarSide>
                    <NavbarLinkContainer>
                        <ThemeToggler />
                    </NavbarLinkContainer>
                </NavbarSide>
            </NavbarNav>

            <Routes>
                <Route path="/" element={<TestsMain />} />
                <Route path="/create" element={<TestCreate />} />
                <Route path="/:testName" element={<TestDetail />} />
            </Routes>
        </MainContainer>
    );
}