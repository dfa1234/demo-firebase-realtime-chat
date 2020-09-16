import React, {FC} from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from "@material-ui/core";


export const MaterialThemeProvider:FC = ({ children }) => {

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: 'light',
                },
            }),
        [],
    );

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
