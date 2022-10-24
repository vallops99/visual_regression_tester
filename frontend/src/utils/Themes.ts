import theme from 'styled-theming';

import { DARK_THEME, LIGHT_THEME } from './Constants';

export const mainColors = theme('mode', {
    [LIGHT_THEME]: `
        --link-color: -webkit-link;
        --text-color: #1A2730;
        --text-color-hover: #1A2730BB;
        --border-color: #f0f0f0;
        --background-color: #FFF;
    `,
    [DARK_THEME]: `
        --link-color: #AfAf00;
        --text-color: #E6E7E8;
        --text-color-hover: #E6E7E8BB;
        --border-color: #0f0f0f;
        --background-color: #1A2730;
    `,
});