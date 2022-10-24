import styled from "styled-components";
import { mainColors } from "./utils";

export const ThemeWrapper = styled.div`
    ${mainColors};

    min-height: 100vh;

    background-color: var(--background-color);
`;