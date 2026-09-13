export interface SummaryAnalytics {
    revenue: string;
    expenses: string;
    net: string;
    pending: string;
    transactionCount: number;
}

export interface TrendPoint {
    month: string;
    revenue: string;
    expenses: string;
}

export interface BreakdownItem {
    name: string;
    amount: string;
    count: number;
}

export interface BreakdownAnalytics {
    category: BreakdownItem[];
    status: BreakdownItem[];
}