import { useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";

import type {
    TransactionCategory,
    TransactionFilters as Filters,
    TransactionStatus,
} from "../../types/transaction";

interface TransactionFiltersProps {
    filters: Filters;
    onApply: (filters: Filters) => void;
    onReset: () => void;
}

export default function TransactionFilters({
    filters,
    onApply,
    onReset,
}: TransactionFiltersProps) {
    const [localFilters, setLocalFilters] =
        useState<Filters>(filters);

    function updateFilter(
        key: keyof Filters,
        value: string
    ) {
        setLocalFilters((previous) => ({
            ...previous,
            [key]: value || undefined,
        }));
    }

    function handleApply() {
        onApply(localFilters);
    }

    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                label="Search transactions"
                placeholder="Search by ID, user, category or status"
                value={localFilters.search ?? ""}
                onChange={(event) =>
                    updateFilter(
                        "search",
                        event.target.value
                    )
                }
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "repeat(4, 1fr)",
                    },
                    gap: 2,
                }}
            >
                <TextField
                    label="From date"
                    type="date"
                    value={localFilters.dateFrom ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "dateFrom",
                            event.target.value
                        )
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <TextField
                    label="To date"
                    type="date"
                    value={localFilters.dateTo ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "dateTo",
                            event.target.value
                        )
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

                <TextField
                    label="Min amount"
                    type="number"
                    value={localFilters.minAmount ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "minAmount",
                            event.target.value
                        )
                    }
                    slotProps={{
                        htmlInput: {
                            min: 0,
                            step: "0.01",
                        },
                    }}
                />

                <TextField
                    label="Max amount"
                    type="number"
                    value={localFilters.maxAmount ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "maxAmount",
                            event.target.value
                        )
                    }
                    slotProps={{
                        htmlInput: {
                            min: 0,
                            step: "0.01",
                        },
                    }}
                />

                <TextField
                    select
                    label="Category"
                    value={localFilters.category ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "category",
                            event.target.value
                        )
                    }
                >
                    <MenuItem value="">All categories</MenuItem>
                    <MenuItem value="Revenue">
                        Revenue
                    </MenuItem>
                    <MenuItem value="Expense">
                        Expense
                    </MenuItem>
                </TextField>

                <TextField
                    select
                    label="Status"
                    value={localFilters.status ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "status",
                            event.target.value
                        )
                    }
                >
                    <MenuItem value="">All statuses</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Pending">
                        Pending
                    </MenuItem>
                </TextField>

                <TextField
                    label="User ID"
                    placeholder="e.g. user_001"
                    value={localFilters.userId ?? ""}
                    onChange={(event) =>
                        updateFilter(
                            "userId",
                            event.target.value
                        )
                    }
                />

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <Button
                        variant="contained"
                        onClick={handleApply}
                        fullWidth
                    >
                        Apply
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
}