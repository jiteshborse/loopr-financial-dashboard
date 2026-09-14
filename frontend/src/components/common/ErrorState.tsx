import { Alert } from "@mui/material";

interface ErrorStateProps {
    message?: string;
}

export default function ErrorState({
    message = "Something went wrong.",
}: ErrorStateProps) {
    return <Alert severity="error">{message}</Alert>;
}