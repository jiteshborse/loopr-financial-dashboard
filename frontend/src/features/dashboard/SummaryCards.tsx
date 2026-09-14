import {
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

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
        },
        {
            title: "Total Expenses",
            value: formatCurrency(summary.expenses),
        },
        {
            title: "Net Flow",
            value: formatCurrency(summary.net),
        },
        {
            title: "Pending",
            value: formatCurrency(summary.pending),
        },
    ];

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid
                    key={card.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >
                    <Card>
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{ mt: 1 }}
                            >
                                {card.value}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}