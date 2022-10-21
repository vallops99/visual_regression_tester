import { Route, Routes } from "react-router";

import { TestsMain, TestDetail } from "../../pages";
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
                        <NavbarLink to="/">
                            VRT
                        </NavbarLink>
                    </NavbarLinkContainer>
                </NavbarSide>
            </NavbarNav>

            <Routes>
                <Route path="/" element={<TestsMain />} />
                <Route path="/:testName" element={<TestDetail />} />
            </Routes>
        </MainContainer>
    );
}