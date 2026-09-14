import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { TrendPoint } from "../../types/analytics";

import { formatCurrency } from "../../utils/currency";

interface RevenueExpenseChartProps {
    data: TrendPoint[];
}

export default function RevenueExpenseChart({
    data,
}: RevenueExpenseChartProps) {
    const chartData = data.map((item) => ({
        month: item.month,
        revenue: Number(item.revenue),
        expenses: Number(item.expenses),
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    Revenue vs Expenses
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Monthly financial performance
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

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

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            strokeWidth={3}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="expenses"
                            name="Expenses"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}