import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingStateProps {
    message?: string;
}

export default function LoadingState({
    message = "Loading...",
}: LoadingStateProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 240,
                py: 6,
                gap: 2,
            }}
        >
            <CircularProgress color="primary" size={40} thickness={4} />
            {message && (
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );
}
