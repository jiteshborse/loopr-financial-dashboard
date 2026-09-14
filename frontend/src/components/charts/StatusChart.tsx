import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
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

const STATUS_COLORS: Record<string, string> = {
    Paid: "#10b981",
    Pending: "#f59e0b",
};

export default function StatusChart({ data }: StatusChartProps) {
    const chartData = data.map((item) => ({
        name: item.name,
        amount: Number(item.amount),
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 750, color: "#ffffff", letterSpacing: "-0.015em" }}
                >
                    Settlement Status
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "#94a3b8", mb: 2, mt: 0.25 }}
                >
                    Value distribution: Cleared transactions vs. In-flight commitments
                </Typography>

                <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.06)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 600 }}
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
                            formatter={(value) => [
                                formatCurrency(Number(value)),
                                "Total Value",
                            ]}
                        />

                        <Bar
                            dataKey="amount"
                            name="Amount"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={65}
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={STATUS_COLORS[entry.name] || "#6366f1"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}