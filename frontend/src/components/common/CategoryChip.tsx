import { Chip } from "@mui/material";

interface CategoryChipProps {
    category: "Revenue" | "Expense";
}

export default function CategoryChip({ category }: CategoryChipProps) {
    const isRevenue = category === "Revenue";

    return (
        <Chip
            label={category}
            size="small"
            sx={{
                height: 24,
                fontSize: "0.74rem",
                fontWeight: 700,
                borderRadius: 1.5,
                backgroundColor: isRevenue
                    ? "rgba(16, 185, 129, 0.12)"
                    : "rgba(244, 63, 94, 0.12)",
                color: isRevenue ? "#34d399" : "#fda4af",
                border: isRevenue
                    ? "1px solid rgba(16, 185, 129, 0.28)"
                    : "1px solid rgba(244, 63, 94, 0.28)",
            }}
        />
    );
}