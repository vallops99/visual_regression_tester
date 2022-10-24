import { ReactNode, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import { DARK_THEME, LIGHT_THEME, Theme } from ".";

interface Props {
    children: ReactNode
}

export function ThemeContextProvider({ children } : Props) {
    const isBrowserDefaultDark = useCallback(() => window.matchMedia("(prefers-color-scheme: dark)").matches, []);

    const [mode, setMode] = useState<Theme>(isBrowserDefaultDark() ? DARK_THEME : LIGHT_THEME);

    const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

    useLayoutEffect(() => {
		document.body.className = `body-${mode}`;
	}, [mode]);

    return (
        <ThemeProvider theme={value}>
            { children }
        </ThemeProvider>
    );
}