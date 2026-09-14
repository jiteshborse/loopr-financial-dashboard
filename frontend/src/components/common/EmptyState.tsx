import { Alert } from "@mui/material";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No data found.",
}: EmptyStateProps) {
  return <Alert severity="info">{message}</Alert>;
}