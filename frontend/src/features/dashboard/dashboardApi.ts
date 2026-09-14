import request from "../../services/api";
import type {
    SummaryAnalytics,
    TrendPoint,
    BreakdownAnalytics,
} from "../../types/analytics";

import type { TransactionFilters } from "../../types/transaction";

function buildQuery(filters: TransactionFilters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            params.set(key, String(value));
        }
    });

    return params.toString();
}

export async function getSummary(
    filters: TransactionFilters = {}
): Promise<SummaryAnalytics> {
    const query = buildQuery(filters);

    return request<SummaryAnalytics>(
        `/analytics/summary${query ? `?${query}` : ""}`
    );
}

export async function getTrends(
    filters: TransactionFilters = {}
): Promise<{ data: TrendPoint[] }> {
    const query = buildQuery(filters);

    return request<{ data: TrendPoint[] }>(
        `/analytics/trends${query ? `?${query}` : ""}`
    );
}

export async function getBreakdown(
    filters: TransactionFilters = {}
): Promise<BreakdownAnalytics> {
    const query = buildQuery(filters);

    return request<BreakdownAnalytics>(
        `/analytics/breakdown${query ? `?${query}` : ""}`
    );
}