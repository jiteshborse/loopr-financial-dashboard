import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#0b0f14",
            paper: "#11161d",
        },

        primary: {
            main: "#8b5cf6",
        },

        success: {
            main: "#22c55e",
        },

        warning: {
            main: "#f59e0b",
        },

        error: {
            main: "#ef4444",
        },

        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },
    },

    typography: {
        fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

        h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },

        h5: {
            fontWeight: 700,
        },

        h6: {
            fontWeight: 650,
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border:
                        "1px solid rgba(255,255,255,0.06)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10,
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor:
                        "rgba(255,255,255,0.06)",
                },

                head: {
                    fontWeight: 700,
                },
            },
        },
    },
});

export default theme;