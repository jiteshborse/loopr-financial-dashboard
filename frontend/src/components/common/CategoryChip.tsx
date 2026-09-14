import { Chip } from "@mui/material";

interface CategoryChipProps {
    category: "Revenue" | "Expense";
}

export default function CategoryChip({
    category,
}: CategoryChipProps) {
    return (
        <Chip
            label={category}
            size="small"
            variant="outlined"
            color={
                category === "Revenue"
                    ? "success"
                    : "error"
            }
        />
    );
}