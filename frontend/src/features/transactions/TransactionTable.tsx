import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from "@mui/material";

import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";

interface TransactionTableProps {
    transactions: Transaction[];
    sortBy: string;
    sortOrder: "asc" | "desc";
    onSort: (field: string) => void;
}

export default function TransactionTable({
    transactions,
    sortBy,
    sortOrder,
    onSort,
}: TransactionTableProps) {
    const columns = [
        { key: "id", label: "ID" },
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "userId", label: "User" },
    ];

    return (
        <TableContainer
            component={Paper}
            sx={{
                mt: 3,
                overflowX: "auto",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.key}>
                                <TableSortLabel
                                    active={sortBy === column.key}
                                    direction={
                                        sortBy === column.key
                                            ? sortOrder
                                            : "asc"
                                    }
                                    onClick={() =>
                                        onSort(column.key)
                                    }
                                >
                                    <Typography fontWeight={700}>
                                        {column.label}
                                    </Typography>
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow
                            key={transaction.id}
                            hover
                        >
                            <TableCell>
                                #{transaction.id}
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    transaction.date
                                ).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                {formatCurrency(
                                    transaction.amount
                                )}
                            </TableCell>

                            <TableCell>
                                <Chip
                                    label={transaction.category}
                                    size="small"
                                />
                            </TableCell>

                            <TableCell>
                                <Chip
                                    label={transaction.status}
                                    size="small"
                                    variant="outlined"
                                />
                            </TableCell>

                            <TableCell>
                                {transaction.user_id}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}