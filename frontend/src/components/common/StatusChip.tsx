import { Chip } from "@mui/material";

interface StatusChipProps {
    status: "Paid" | "Pending";
}

export default function StatusChip({
    status,
}: StatusChipProps) {
    return (
        <Chip
            label={status}
            size="small"
            color={
                status === "Paid"
                    ? "success"
                    : "warning"
            }
            variant="outlined"
        />
    );
}