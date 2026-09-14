import {
    Card,
    CardContent,
    Stack,
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
            <CardContent sx={{ p: 3 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        mb: 3,
                    }}
                >
                    <div>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 750, color: "#ffffff", letterSpacing: "-0.015em" }}
                        >
                            Cash Flow Velocity
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ color: "#94a3b8", mt: 0.25 }}
                        >
                            Monthly comparison of Revenue inflows versus Operating expenses
                        </Typography>
                    </div>
                </Stack>

                <ResponsiveContainer width="100%" height={320}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.06)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: "rgba(255, 255, 255, 0.08)" }}
                        />

                        <YAxis
                            stroke="#64748b"
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) =>
                                `$${(Number(value) / 1000).toFixed(0)}k`
                            }
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0d131f",
                                borderColor: "rgba(255, 255, 255, 0.12)",
                                borderRadius: 10,
                                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
                                color: "#f8fafc",
                            }}
                            itemStyle={{ color: "#f8fafc", fontSize: 13 }}
                            formatter={(value) => [
                                formatCurrency(Number(value)),
                            ]}
                        />

                        <Legend
                            wrapperStyle={{
                                paddingTop: 16,
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue ($)"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: "#34d399" }}
                        />

                        <Line
                            type="monotone"
                            dataKey="expenses"
                            name="Expenses ($)"
                            stroke="#f43f5e"
                            strokeWidth={3}
                            dot={{ r: 3, fill: "#f43f5e", strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: "#fb7185" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}