import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { BreakdownItem } from "../../types/analytics";

import { formatCurrency } from "../../utils/currency";

interface StatusChartProps {
    data: BreakdownItem[];
}

export default function StatusChart({
    data,
}: StatusChartProps) {
    const chartData = data.map((item) => ({
        name: item.name,
        amount: Number(item.amount),
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Transaction Status
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Paid vs pending transaction value
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={280}
                >
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis
                            tickFormatter={(value) =>
                                `$${Number(value) / 1000}k`
                            }
                        />

                        <Tooltip
                            formatter={(value) =>
                                formatCurrency(Number(value))
                            }
                        />

                        <Bar
                            dataKey="amount"
                            name="Amount"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}