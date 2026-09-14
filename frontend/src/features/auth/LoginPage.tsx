import { FormEvent, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { login } from "./authApi";

interface LoginPageProps {
    onLogin: () => void;
}

export default function LoginPage({
    onLogin,
}: LoginPageProps) {
    const [email, setEmail] = useState("analyst@loopr.dev");
    const [password, setPassword] = useState("Loopr@12345");
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
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                backgroundColor: "#0b0f14",
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                }}
            >
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h4" fontWeight={700}>
                            Loopr Analytics
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Sign in to access your financial dashboard.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                fullWidth
                                required
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                fullWidth
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}