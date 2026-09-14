import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { Box } from "@mui/material";

import type { SummaryAnalytics } from "../../types/analytics";
import { formatCurrency } from "../../utils/currency";

interface SummaryCardsProps {
    summary: SummaryAnalytics;
}

export default function SummaryCards({
    summary,
}: SummaryCardsProps) {
    const cards = [
        {
            title: "Total Revenue",
            value: formatCurrency(summary.revenue),
            icon: TrendingUpIcon,
            description: "Total incoming revenue",
        },
        {
            title: "Total Expenses",
            value: formatCurrency(summary.expenses),
            icon: TrendingDownIcon,
            description: "Total recorded expenses",
        },
        {
            title: "Net Flow",
            value: formatCurrency(summary.net),
            icon: AccountBalanceWalletIcon,
            description: "Revenue minus expenses",
        },
        {
            title: "Pending",
            value: formatCurrency(summary.pending),
            icon: PendingActionsIcon,
            description: "Pending transaction value",
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
                                transition:
                                    "transform 0.2s ease, border-color 0.2s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    borderColor:
                                        "rgba(139,92,246,0.35)",
                                },
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {card.title}
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            sx={{ mt: 1 }}
                                        >
                                            {card.value}
                                        </Typography>
                                    </Box>

                                    <Stack
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 2,
                                            backgroundColor:
                                                "rgba(139,92,246,0.10)",
                                        }}
                                    >
                                        <Icon
                                            fontSize="small"
                                            sx={{
                                                color: "primary.main",
                                            }}
                                        />
                                    </Stack>
                                </Stack>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: "block",
                                        mt: 2,
                                    }}
                                >
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}