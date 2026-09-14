import { Chip } from "@mui/material";

interface StatusChipProps {
    status: "Paid" | "Pending";
}

export default function StatusChip({ status }: StatusChipProps) {
    const isPaid = status === "Paid";

    return (
        <Chip
            label={status}
            size="small"
            sx={{
                height: 24,
                fontSize: "0.74rem",
                fontWeight: 700,
                borderRadius: 1.5,
                backgroundColor: isPaid
                    ? "rgba(16, 185, 129, 0.12)"
                    : "rgba(245, 158, 11, 0.12)",
                color: isPaid ? "#34d399" : "#fbbf24",
                border: isPaid
                    ? "1px solid rgba(16, 185, 129, 0.28)"
                    : "1px solid rgba(245, 158, 11, 0.28)",
            }}
        />
    );
}