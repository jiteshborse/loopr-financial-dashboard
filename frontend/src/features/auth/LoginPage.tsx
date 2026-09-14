import { useState, type FormEvent } from "react";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import { login } from "./authApi";

interface LoginPageProps {
    onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [email, setEmail] = useState("analyst@loopr.dev");
    const [password, setPassword] = useState("Loopr@12345");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);
            onLogin();
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    function handleFillDemoCredentials() {
        setEmail("analyst@loopr.dev");
        setPassword("Loopr@12345");
        setError("");
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, sm: 3 },
                backgroundColor: "#080c14",
                backgroundImage: `
                    radial-gradient(circle at 50% 15%, rgba(99, 102, 241, 0.15) 0%, transparent 55%),
                    radial-gradient(circle at 10% 90%, rgba(14, 165, 233, 0.08) 0%, transparent 45%)
                `,
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    width: "100%",
                    maxWidth: 440,
                    p: { xs: 3.5, sm: 4.5 },
                    backgroundColor: "rgba(13, 19, 31, 0.85)",
                    backdropFilter: "blur(16px)",
                    borderRadius: 4,
                    border: "1px solid rgba(255, 255, 255, 0.09)",
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
            >
                <Stack spacing={3.5}>
                    {/* Brand Header */}
                    <Box sx={{ textAlign: "center" }}>
                        <Box
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 54,
                                height: 54,
                                borderRadius: 3,
                                background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                                boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.45)",
                                mb: 2,
                                fontWeight: 900,
                                fontSize: "1.6rem",
                                color: "#ffffff",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            L
                        </Box>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: "-0.03em",
                                color: "#ffffff",
                            }}
                        >
                            Loopr Intelligence
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#94a3b8",
                                mt: 0.75,
                                fontSize: "0.875rem",
                            }}
                        >
                            Institutional Financial Analytics Platform
                        </Typography>
                    </Box>

                    {/* Quick Demo Credentials Pill */}
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 2.5,
                            backgroundColor: "rgba(99, 102, 241, 0.08)",
                            border: "1px solid rgba(99, 102, 241, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#818cf8",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    display: "block",
                                }}
                            >
                                Demo Analyst Account
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "#cbd5e1" }}
                            >
                                analyst@loopr.dev
                            </Typography>
                        </Box>

                        <Chip
                            icon={<AutoAwesomeOutlinedIcon sx={{ "&&": { fontSize: "0.85rem", color: "#6366f1" } }} />}
                            label="Auto-fill"
                            size="small"
                            onClick={handleFillDemoCredentials}
                            clickable
                            sx={{
                                height: 26,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                backgroundColor: "rgba(99, 102, 241, 0.15)",
                                color: "#c7d2fe",
                                border: "1px solid rgba(99, 102, 241, 0.3)",
                                "&:hover": {
                                    backgroundColor: "rgba(99, 102, 241, 0.25)",
                                },
                            }}
                        />
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                borderRadius: 2,
                                backgroundColor: "rgba(244, 63, 94, 0.1)",
                                border: "1px solid rgba(244, 63, 94, 0.3)",
                                color: "#fda4af",
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.25}>
                            <TextField
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                fullWidth
                                required
                                autoFocus
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon sx={{ color: "text.secondary", fontSize: "1.15rem" }} />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                fullWidth
                                required
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon sx={{ color: "text.secondary", fontSize: "1.15rem" }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="small"
                                                    sx={{ color: "text.secondary" }}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffOutlinedIcon fontSize="small" />
                                                    ) : (
                                                        <VisibilityOutlinedIcon fontSize="small" />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 1,
                                    py: 1.25,
                                    fontSize: "0.95rem",
                                    fontWeight: 700,
                                    letterSpacing: "-0.01em",
                                    background: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                                    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
                                    },
                                }}
                            >
                                {loading ? (
                                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                        <CircularProgress size={18} color="inherit" />
                                        <span>Authenticating...</span>
                                    </Stack>
                                ) : (
                                    "Sign In to Terminal"
                                )}
                            </Button>
                        </Stack>
                    </Box>

                    {/* Security Trust Footer */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            color: "rgba(148, 163, 184, 0.6)",
                            pt: 1,
                        }}
                    >
                        <SecurityOutlinedIcon sx={{ fontSize: "0.9rem" }} />
                        <Typography variant="caption" sx={{ letterSpacing: "0.02em" }}>
                            256-Bit Encrypted Secure Session
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
}