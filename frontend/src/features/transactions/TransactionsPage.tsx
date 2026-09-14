import { useCallback, useEffect, useState } from "react";

import {
    Box,
    Container,
    Typography,
} from "@mui/material";

import {
    getTransactions,
    type TransactionQuery,
} from "./transactionApi";

import type {
    TransactionFilters as Filters,
    TransactionResponse,
} from "../../types/transaction";

import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import Pagination from "./Pagination";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

export default function TransactionsPage() {
    const [response, setResponse] =
        useState<TransactionResponse | null>(null);

    const [filters, setFilters] =
        useState<Filters>({});

    const [sortBy, setSortBy] =
        useState("date");

    const [sortOrder, setSortOrder] =
        useState<"asc" | "desc">("desc");

    const [page, setPage] = useState(1);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const pageSize = 25;

    const loadTransactions = useCallback(
        async () => {
            try {
                setLoading(true);
                setError("");

                const query: TransactionQuery = {
                    ...filters,
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                };

                const data =
                    await getTransactions(query);

                setResponse(data);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load transactions"
                );
            } finally {
                setLoading(false);
            }
        },
        [
            filters,
            page,
            sortBy,
            sortOrder,
        ]
    );

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    function handleApply(
        newFilters: Filters
    ) {
        setFilters(newFilters);
        setPage(1);
    }

    function handleReset() {
        setFilters({});
        setPage(1);
    }

    function handleSort(field: string) {
        if (sortBy === field) {
            setSortOrder((previous) =>
                previous === "asc"
                    ? "desc"
                    : "asc"
            );
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }

        setPage(1);
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: {
                    xs: 2,
                    md: 4,
                },
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    color="white"
                >
                    Transactions
                </Typography>

                <Typography
                    color="rgba(255,255,255,0.55)"
                    sx={{ mt: 1 }}
                >
                    Search, filter and analyze transaction
                    activity.
                </Typography>
            </Box>

            <TransactionFilters
                filters={filters}
                onApply={handleApply}
                onReset={handleReset}
            />

            {loading && <LoadingState />}

            {!loading && error && (
                <Box sx={{ mt: 3 }}>
                    <ErrorState message={error} />
                </Box>
            )}

            {!loading &&
                !error &&
                response &&
                response.data.length === 0 && (
                    <Box sx={{ mt: 3 }}>
                        <EmptyState message="No transactions match your filters." />
                    </Box>
                )}

            {!loading &&
                !error &&
                response &&
                response.data.length > 0 && (
                    <>
                        <TransactionTable
                            transactions={response.data}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                        />

                        <Pagination
                            page={response.meta.page}
                            totalPages={
                                response.meta.totalPages
                            }
                            total={response.meta.total}
                            pageSize={
                                response.meta.pageSize
                            }
                            onPageChange={(newPage) =>
                                setPage(newPage)
                            }
                        />
                    </>
                )}
        </Container>
    );
}