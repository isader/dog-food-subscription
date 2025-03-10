import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
        main: 'rgb(1,86,72)',
        },
        secondary: {
        main: 'rgb(254,136,107)',
        },
        background: {
        default: 'rgb(255,255,255)',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        }
    },
    components: {
        MuiButton: {
        styleOverrides: {
            contained: {
                borderRadius: 24,
            },
            outlined: {
                borderRadius: 24,
            }
        }
        },
        MuiPaper: {
        styleOverrides: {
            rounded: {
                borderRadius: 12,
            }
        }
        }
    }
});