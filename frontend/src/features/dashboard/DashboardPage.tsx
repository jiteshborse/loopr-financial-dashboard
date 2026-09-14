import { useEffect, useState } from "react";

import {
    Box,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

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
import type { AuthUser } from "../../types/auth";

import SummaryCards from "./SummaryCards";
import RevenueExpenseChart from "../../components/charts/RevenueExpenseChart";
import BreakdownChart from "../../components/charts/BreakdownChart";
import StatusChart from "../../components/charts/StatusChart";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";

interface DashboardPageProps {
    user?: AuthUser | null;
}

export default function DashboardPage({ user }: DashboardPageProps) {
    const [summary, setSummary] = useState<SummaryAnalytics | null>(null);
    const [trends, setTrends] = useState<TrendPoint[]>([]);
    const [breakdown, setBreakdown] = useState<BreakdownAnalytics | null>(null);

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

    const userFirstName = user?.name ? user.name.split(" ")[0] : "Jitesh";

    const currentDateFormatted = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: {
                    xs: 2.5,
                    md: 4,
                },
            }}
        >
            {/* Executive Dashboard Header */}
            <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "#ffffff",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        Welcome back, {userFirstName}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.75,
                            color: "#94a3b8",
                            fontSize: "0.95rem",
                        }}
                    >
                        Real-time cash flow velocity, operating expenditures, and transaction health.
                    </Typography>
                </Box>

                {/* Status Badges */}
                <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                    <Chip
                        icon={<StorageOutlinedIcon sx={{ "&&": { fontSize: "0.95rem", color: "#10b981" } }} />}
                        label="Live Atlas Cluster"
                        size="small"
                        sx={{
                            height: 28,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            color: "#34d399",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                        }}
                    />

                    <Chip
                        icon={<CalendarTodayOutlinedIcon sx={{ "&&": { fontSize: "0.85rem", color: "#818cf8" } }} />}
                        label={currentDateFormatted}
                        size="small"
                        sx={{
                            height: 28,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            backgroundColor: "rgba(99, 102, 241, 0.1)",
                            color: "#c7d2fe",
                            border: "1px solid rgba(99, 102, 241, 0.25)",
                        }}
                    />
                </Stack>
            </Box>

            {loading && <LoadingState />}

            {!loading && error && <ErrorState message={error} />}

            {!loading && !error && summary && breakdown && (
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
                        <StatusChart data={breakdown.status} />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}