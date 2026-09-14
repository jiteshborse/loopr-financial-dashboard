import {
    Box,
    Pagination as MuiPagination,
    Typography,
} from "@mui/material";

interface PaginationProps {
    page: number;
    totalPages: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    total,
    pageSize,
    onPageChange,
}: PaginationProps) {
    const start =
        total === 0 ? 0 : (page - 1) * pageSize + 1;

    const end = Math.min(
        page * pageSize,
        total
    );

    return (
        <Box
            sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
            >
                Showing {start}–{end} of {total}
            </Typography>

            <MuiPagination
                page={page}
                count={totalPages}
                onChange={(_, value) =>
                    onPageChange(value)
                }
                color="primary"
            />
        </Box>
    );
}