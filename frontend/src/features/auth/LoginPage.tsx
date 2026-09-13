import {
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import {
    login
} from "./authApi";

interface LoginPageProps {
    onLogin: () => void;
}

export function LoginPage({
    onLogin
}: LoginPageProps) {
    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(
                email,
                password
            );

            onLogin();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Login failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container
            maxWidth="sm"
            sx={{ py: 10 }}
        >
            <Paper
                sx={{ p: 4 }}
                elevation={3}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                >
                    Sign in
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Financial Analytics Dashboard
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        margin="normal"
                        required
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}