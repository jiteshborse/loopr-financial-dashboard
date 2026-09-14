import {
    useEffect,
    useState,
} from "react";

import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Typography,
} from "@mui/material";

import type { Transaction } from "../../types/transaction";

import {
    CSV_COLUMNS,
    type CsvColumn,
    generateCsv,
    downloadCsv,
} from "../../utils/csv";

interface CsvExportModalProps {
    open: boolean;
    transactions: Transaction[];
    onClose: () => void;
}

export default function CsvExportModal({
    open,
    transactions,
    onClose,
}: CsvExportModalProps) {
    const [selectedColumns, setSelectedColumns] =
        useState<CsvColumn[]>(
            CSV_COLUMNS.map((column) => column.key)
        );

    useEffect(() => {
        if (open) {
            setSelectedColumns(
                CSV_COLUMNS.map(
                    (column) => column.key
                )
            );
        }
    }, [open]);

    function toggleColumn(
        column: CsvColumn
    ) {
        setSelectedColumns((previous) =>
            previous.includes(column)
                ? previous.filter(
                    (item) => item !== column
                )
                : [...previous, column]
        );
    }

    function selectAll() {
        setSelectedColumns(
            CSV_COLUMNS.map(
                (column) => column.key
            )
        );
    }

    function clearAll() {
        setSelectedColumns([]);
    }

    function handleExport() {
        if (selectedColumns.length === 0) {
            return;
        }

        const csv = generateCsv(
            transactions,
            selectedColumns
        );

        const date = new Date()
            .toISOString()
            .slice(0, 10);

        downloadCsv(
            csv,
            `transactions-${date}.csv`
        );

        onClose();
    }

    const allSelected =
        selectedColumns.length ===
        CSV_COLUMNS.length;

    const noneSelected =
        selectedColumns.length === 0;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Export Transactions
            </DialogTitle>

            <DialogContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Choose the columns you want to
                    include in your CSV file.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <Button
                        size="small"
                        onClick={selectAll}
                        disabled={allSelected}
                    >
                        Select All
                    </Button>

                    <Button
                        size="small"
                        onClick={clearAll}
                        disabled={noneSelected}
                    >
                        Clear All
                    </Button>
                </Box>

                <FormGroup>
                    {CSV_COLUMNS.map((column) => (
                        <FormControlLabel
                            key={column.key}
                            control={
                                <Checkbox
                                    checked={selectedColumns.includes(
                                        column.key
                                    )}
                                    onChange={() =>
                                        toggleColumn(
                                            column.key
                                        )
                                    }
                                />
                            }
                            label={column.label}
                        />
                    ))}
                </FormGroup>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        display: "block",
                        mt: 2,
                    }}
                >
                    {transactions.length} transaction
                    {transactions.length === 1
                        ? ""
                        : "s"} will be exported.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleExport}
                    disabled={noneSelected}
                >
                    Export CSV
                </Button>
            </DialogActions>
        </Dialog>
    );
}