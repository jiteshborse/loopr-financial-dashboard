import {
  Alert,
  Button,
} from "@mui/material";

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
}

export default function EmptyState({
  message = "No data found.",
  onReset,
}: EmptyStateProps) {
  return (
    <Alert
      severity="info"
      action={
        onReset ? (
          <Button
            color="inherit"
            size="small"
            onClick={onReset}
          >
            Clear filters
          </Button>
        ) : undefined
      }
    >
      {message}
    </Alert>
  );
}