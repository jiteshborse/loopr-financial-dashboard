import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import type { BreakdownItem } from "../../types/analytics";
import { formatCurrency } from "../../utils/currency";

interface BreakdownChartProps {
    data: BreakdownItem[];
    title: string;
    subtitle: string;
}

const CATEGORY_COLORS: Record<string, string> = {
    Revenue: "#10b981",
    Expense: "#f43f5e",
};

export default function BreakdownChart({
    data,
    title,
    subtitle,
}: BreakdownChartProps) {
    const chartData = data.map((item) => ({
        name: item.name,
        value: Number(item.amount),
    }));

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 750, color: "#ffffff", letterSpacing: "-0.015em" }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "#94a3b8", mb: 2, mt: 0.25 }}
                >
                    {subtitle}
                </Typography>

                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={4}
                            stroke="none"
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={
                                        CATEGORY_COLORS[entry.name] ||
                                        "#6366f1"
                                    }
                                />
                            ))}
                        </Pie>

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
                                "Total Amount",
                            ]}
                        />

                        <Legend
                            verticalAlign="bottom"
                            wrapperStyle={{
                                paddingTop: 12,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}