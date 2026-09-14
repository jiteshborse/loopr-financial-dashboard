import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import type { TransactionFilters as Filters } from "../../types/transaction";

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
    const [localFilters, setLocalFilters] = useState<Filters>(filters);
    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    function updateFilter(key: keyof Filters, value: string) {
        setLocalFilters((previous) => ({
            ...previous,
            [key]: value || undefined,
        }));
    }

    function handleApply() {
        setValidationError("");

        if (
            localFilters.dateFrom &&
            localFilters.dateTo &&
            localFilters.dateFrom > localFilters.dateTo
        ) {
            setValidationError(
                "The start date cannot be later than the end date."
            );
            return;
        }

        if (
            localFilters.minAmount &&
            localFilters.maxAmount &&
            Number(localFilters.minAmount) > Number(localFilters.maxAmount)
        ) {
            setValidationError(
                "Minimum amount cannot be greater than maximum amount."
            );
            return;
        }

        if (localFilters.minAmount && Number(localFilters.minAmount) < 0) {
            setValidationError("Minimum amount cannot be negative.");
            return;
        }

        if (localFilters.maxAmount && Number(localFilters.maxAmount) < 0) {
            setValidationError("Maximum amount cannot be negative.");
            return;
        }

        onApply(localFilters);
    }

    function handleResetClick() {
        setValidationError("");
        setLocalFilters({});
        onReset();
    }

    const activeFilterCount = Object.values(localFilters).filter(
        (val) => val !== undefined && val !== null && val !== ""
    ).length;

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Stack spacing={2.5}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <FilterAltIcon
                                fontSize="small"
                                sx={{ color: "text.secondary" }}
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Filter Transactions
                            </Typography>
                            {activeFilterCount > 0 && (
                                <Chip
                                    label={`${activeFilterCount} active`}
                                    size="small"
                                    color="primary"
                                    sx={{ height: 20, fontSize: "0.75rem" }}
                                />
                            )}
                        </Stack>

                        {activeFilterCount > 0 && (
                            <Button
                                size="small"
                                color="inherit"
                                onClick={handleResetClick}
                                sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                            >
                                Clear all
                            </Button>
                        )}
                    </Box>

                    {validationError && (
                        <Alert
                            severity="warning"
                            onClose={() => setValidationError("")}
                        >
                            {validationError}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        label="Search transactions"
                        placeholder="Search by ID, user, category or status (press Enter to apply)"
                        value={localFilters.search ?? ""}
                        onChange={(event) =>
                            updateFilter("search", event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleApply();
                            }
                        }}
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
                                updateFilter("dateFrom", event.target.value)
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
                                updateFilter("dateTo", event.target.value)
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
                                updateFilter("minAmount", event.target.value)
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
                                updateFilter("maxAmount", event.target.value)
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
                                updateFilter("category", event.target.value)
                            }
                        >
                            <MenuItem value="">All categories</MenuItem>
                            <MenuItem value="Revenue">Revenue</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Status"
                            value={localFilters.status ?? ""}
                            onChange={(event) =>
                                updateFilter("status", event.target.value)
                            }
                        >
                            <MenuItem value="">All statuses</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="User ID"
                            value={localFilters.userId ?? ""}
                            onChange={(event) =>
                                updateFilter("userId", event.target.value)
                            }
                        >
                            <MenuItem value="">All users</MenuItem>
                            <MenuItem value="user_001">user_001</MenuItem>
                            <MenuItem value="user_002">user_002</MenuItem>
                            <MenuItem value="user_003">user_003</MenuItem>
                            <MenuItem value="user_004">user_004</MenuItem>
                        </TextField>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center" }}
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
                                onClick={handleResetClick}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}