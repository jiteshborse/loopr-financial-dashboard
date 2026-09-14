import {
    Alert,
    Button,
    Stack,
} from "@mui/material";

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorState({
    message = "Something went wrong.",
    onRetry,
}: ErrorStateProps) {
    return (
        <Alert
            severity="error"
            action={
                onRetry ? (
                    <Button
                        color="inherit"
                        size="small"
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                ) : undefined
            }
        >
            <Stack>
                {message}
            </Stack>
        </Alert>
    );
}