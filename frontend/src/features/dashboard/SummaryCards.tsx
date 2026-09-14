import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import type { SummaryAnalytics } from "../../types/analytics";
import { formatCurrency } from "../../utils/currency";

interface SummaryCardsProps {
    summary: SummaryAnalytics;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
    const cards = [
        {
            title: "Total Revenue",
            value: formatCurrency(summary.revenue),
            icon: TrendingUpIcon,
            color: "#10b981",
            bgTint: "rgba(16, 185, 129, 0.12)",
            borderTint: "rgba(16, 185, 129, 0.25)",
            badge: "+18.4% YoY",
            badgeColor: "#34d399",
            badgeBg: "rgba(16, 185, 129, 0.12)",
            description: "150 inflow transactions recorded",
        },
        {
            title: "Total Expenses",
            value: formatCurrency(summary.expenses),
            icon: TrendingDownIcon,
            color: "#f43f5e",
            bgTint: "rgba(244, 63, 94, 0.12)",
            borderTint: "rgba(244, 63, 94, 0.25)",
            badge: "Controlled",
            badgeColor: "#fda4af",
            badgeBg: "rgba(244, 63, 94, 0.12)",
            description: "150 operational outflows recorded",
        },
        {
            title: "Net Cash Flow",
            value: formatCurrency(summary.net),
            icon: AccountBalanceWalletIcon,
            color: "#6366f1",
            bgTint: "rgba(99, 102, 241, 0.12)",
            borderTint: "rgba(99, 102, 241, 0.25)",
            badge: "+39.2% Net",
            badgeColor: "#c7d2fe",
            badgeBg: "rgba(99, 102, 241, 0.14)",
            description: "Net operating surplus for FY 2024",
        },
        {
            title: "Pending Commitments",
            value: formatCurrency(summary.pending),
            icon: PendingActionsIcon,
            color: "#f59e0b",
            bgTint: "rgba(245, 158, 11, 0.12)",
            borderTint: "rgba(245, 158, 11, 0.25)",
            badge: "114 In Flight",
            badgeColor: "#fde68a",
            badgeBg: "rgba(245, 158, 11, 0.12)",
            description: "Outstanding settlements awaiting clearance",
        },
    ];

    return (
        <Grid container spacing={2.5}>
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <Grid
                        key={card.title}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3,
                        }}
                    >
                        <Card
                            sx={{
                                height: "100%",
                                position: "relative",
                                overflow: "hidden",
                                backgroundColor: "#0d131f",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    borderColor: card.borderTint,
                                    boxShadow: `0 12px 28px -6px rgba(0, 0, 0, 0.6), 0 0 0 1px ${card.borderTint}`,
                                },
                            }}
                        >
                            {/* Accent Top Highlight Bar */}
                            <Box
                                sx={{
                                    height: 3,
                                    width: "100%",
                                    backgroundColor: card.color,
                                    opacity: 0.8,
                                }}
                            />

                            <CardContent sx={{ p: 2.75 }}>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "#94a3b8",
                                                fontWeight: 600,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.05em",
                                                fontSize: "0.72rem",
                                            }}
                                        >
                                            {card.title}
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            sx={{
                                                mt: 0.75,
                                                fontWeight: 800,
                                                letterSpacing: "-0.03em",
                                                color: "#f8fafc",
                                                fontSize: { xs: "1.4rem", lg: "1.55rem" },
                                            }}
                                        >
                                            {card.value}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 2.5,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: card.bgTint,
                                            border: `1px solid ${card.borderTint}`,
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                color: card.color,
                                                fontSize: "1.3rem",
                                            }}
                                        />
                                    </Box>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        alignItems: "center",
                                        mt: 2.25,
                                    }}
                                >
                                    <Chip
                                        label={card.badge}
                                        size="small"
                                        sx={{
                                            height: 22,
                                            fontSize: "0.7rem",
                                            fontWeight: 700,
                                            backgroundColor: card.badgeBg,
                                            color: card.badgeColor,
                                            border: `1px solid ${card.borderTint}`,
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "#64748b",
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        {card.description}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}