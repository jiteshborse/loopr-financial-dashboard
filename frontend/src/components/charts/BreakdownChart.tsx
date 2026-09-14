import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    Cell,
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
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {subtitle}
                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={280}
                >
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.name} />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) =>
                                formatCurrency(Number(value))
                            }
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}