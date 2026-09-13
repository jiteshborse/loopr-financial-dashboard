import {
    useEffect,
    useState
} from "react";

import {
    Container,
    Typography
} from "@mui/material";

import {
    getSummary
} from "./dashboardApi";

import {
    SummaryCards
} from "./SummaryCards";

import type {
    SummaryAnalytics
} from "../../types/analytics";

export function DashboardPage() {
    const [summary, setSummary] =
        useState<SummaryAnalytics | null>(
            null
        );

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        getSummary()
            .then(setSummary)
            .catch((err) => {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load dashboard."
                );
            });
    }, []);

    if (error) {
        return (
            <Container>
                <Typography color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    if (!summary) {
        return (
            <Container>
                Loading dashboard...
            </Container>
        );
    }

    return (
        <Container
            maxWidth="xl"
            sx={{ py: 4 }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
            >
                Financial Dashboard
            </Typography>

            <SummaryCards
                summary={summary}
            />
        </Container>
    );
}