import {
    Alert,
    Snackbar,
} from "@mui/material";

export type AlertSeverity =
    | "success"
    | "info"
    | "warning"
    | "error";

interface AlertSnackbarProps {
    open: boolean;
    message: string;
    severity?: AlertSeverity;
    onClose: () => void;
}

export default function AlertSnackbar({
    open,
    message,
    severity = "error",
    onClose,
}: AlertSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={(_, reason) => {
                if (reason === "clickaway") {
                    return;
                }

                onClose();
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Alert
                severity={severity}
                onClose={onClose}
                variant="filled"
                sx={{
                    minWidth: 300,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}