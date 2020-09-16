import React, {FC} from 'react';
import { ThemeProvider } from 'styled-components';


export const StyledThemeProvider:FC = ({ children }) => {

    let aliasBreakpoints:any = [
        `${1000}px`
    ]
    aliasBreakpoints.desktop = `${1000}px`;

    const theme = {
        breakpoints: aliasBreakpoints
    };

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
