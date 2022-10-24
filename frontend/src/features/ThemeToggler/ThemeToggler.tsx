import { useCallback } from "react";
import { useTheme } from "../../hooks";

import { DARK_THEME, LIGHT_THEME } from "../../utils";
import {
    ThemeToggleSpan,
    ThemeToggleInput,
    ThemeToggleLabel,
    ThemeToggleSwitch,
} from "./ThemeTogglerStyles";

export function ThemeToggler() {
    const {mode, setMode} = useTheme();

    const onThemeChange = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.currentTarget.checked ? LIGHT_THEME : DARK_THEME);
    }, [setMode]);

    return (
        <ThemeToggleSwitch>
            <ThemeToggleLabel>
                <ThemeToggleInput
                    type="checkbox"
                    name="theme-toggler"
                    onChange={(event) => onThemeChange(event)}
                    checked={mode === LIGHT_THEME}
                />
                <ThemeToggleSpan isChecked={mode === LIGHT_THEME} />
            </ThemeToggleLabel>
        </ThemeToggleSwitch>
    );
}