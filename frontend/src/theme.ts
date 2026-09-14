import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#080c14",
            paper: "#0d131f",
        },

        primary: {
            main: "#6366f1",
            light: "#818cf8",
            dark: "#4f46e5",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#0ea5e9",
            light: "#38bdf8",
            dark: "#0284c7",
            contrastText: "#ffffff",
        },

        success: {
            main: "#10b981",
            light: "#34d399",
            dark: "#059669",
        },

        warning: {
            main: "#f59e0b",
            light: "#fbbf24",
            dark: "#d97706",
        },

        error: {
            main: "#f43f5e",
            light: "#fb7185",
            dark: "#e11d48",
        },

        info: {
            main: "#38bdf8",
        },

        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },

        divider: "rgba(255, 255, 255, 0.08)",
    },

    typography: {
        fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

        h4: {
            fontWeight: 700,
            letterSpacing: "-0.025em",
        },

        h5: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },

        h6: {
            fontWeight: 650,
            letterSpacing: "-0.015em",
        },

        subtitle1: {
            fontWeight: 600,
            letterSpacing: "-0.01em",
        },

        subtitle2: {
            fontWeight: 600,
        },

        button: {
            fontWeight: 600,
            textTransform: "none",
            letterSpacing: "0.01em",
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: "#1e293b #080c14",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        width: 8,
                        height: 8,
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#1e293b",
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: "#0d131f",
                    borderRadius: 14,
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.35)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    backgroundColor: "#0d131f",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10,
                    padding: "8px 18px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.3)",
                    },
                },
                contained: {
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            },
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        borderRadius: 10,
                        "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                        },
                        "&:hover fieldset": {
                            borderColor: "rgba(99, 102, 241, 0.4)",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#6366f1",
                            borderWidth: 1.5,
                        },
                    },
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: "rgba(255, 255, 255, 0.06)",
                    padding: "14px 16px",
                },
                head: {
                    fontWeight: 700,
                    color: "#94a3b8",
                    backgroundColor: "rgba(13, 19, 31, 0.8)",
                    backdropFilter: "blur(8px)",
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;