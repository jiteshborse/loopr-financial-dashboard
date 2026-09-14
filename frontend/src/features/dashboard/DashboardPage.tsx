import { useEffect, useState } from "react";

import {
    Box,
    Container,
    Grid,
    Typography,
} from "@mui/material";

import {
    getBreakdown,
    getSummary,
    getTrends,
} from "./dashboardApi";

import type {
    BreakdownAnalytics,
    SummaryAnalytics,
    TrendPoint,
} from "../../types/analytics";

import SummaryCards from "./SummaryCards";
import RevenueExpenseChart from "../../components/charts/RevenueExpenseChart";
import BreakdownChart from "../../components/charts/BreakdownChart";
import StatusChart from "../../components/charts/StatusChart";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

interface DashboardPageProps {
    onLogout?: () => void;
}

export default function DashboardPage({
    onLogout,
}: DashboardPageProps) {
    const [summary, setSummary] =
        useState<SummaryAnalytics | null>(null);

    const [trends, setTrends] =
        useState<TrendPoint[]>([]);

    const [breakdown, setBreakdown] =
        useState<BreakdownAnalytics | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const [
                    summaryData,
                    trendsData,
                    breakdownData,
                ] = await Promise.all([
                    getSummary(),
                    getTrends(),
                    getBreakdown(),
                ]);

                setSummary(summaryData);
                setTrends(trendsData.data);
                setBreakdown(breakdownData);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

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
                    Financial Dashboard
                </Typography>

                <Typography
                    color="rgba(255,255,255,0.55)"
                    sx={{ mt: 1 }}
                >
                    Monitor revenue, expenses and transaction
                    activity.
                </Typography>
            </Box>

            {loading && <LoadingState />}

            {!loading && error && (
                <ErrorState message={error} />
            )}

            {!loading &&
                !error &&
                summary &&
                breakdown && (
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <SummaryCards summary={summary} />
                        </Grid>

                        <Grid size={12}>
                            <RevenueExpenseChart data={trends} />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <BreakdownChart
                                data={breakdown.category}
                                title="Category Breakdown"
                                subtitle="Revenue vs expense distribution"
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >
                            <StatusChart
                                data={breakdown.status}
                            />
                        </Grid>
                    </Grid>
                )}
        </Container>
    );
}