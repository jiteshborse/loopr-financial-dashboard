import { apiFetch } from "../../services/api";
import type {
    BreakdownAnalytics,
    SummaryAnalytics,
    TrendPoint
} from "../../types/analytics";
import type { TransactionFilters } from "../transactions/transactionApi";

function buildQuery(
    params: TransactionFilters
): string {
    const searchParams =
        new URLSearchParams();

    Object.entries(params).forEach(
        ([key, value]) => {
            if (
                value !== undefined &&
                value !== ""
            ) {
                searchParams.set(
                    key,
                    String(value)
                );
            }
        }
    );

    const query =
        searchParams.toString();

    return query ? `?${query}` : "";
}

export function getSummary(
    filters: TransactionFilters = {}
) {
    return apiFetch<SummaryAnalytics>(
        `/analytics/summary${buildQuery(
            filters
        )}`
    );
}

export function getTrends(
    filters: TransactionFilters = {}
) {
    return apiFetch<{
        data: TrendPoint[];
    }>(
        `/analytics/trends${buildQuery(
            filters
        )}`
    );
}

export function getBreakdown(
    filters: TransactionFilters = {}
) {
    return apiFetch<BreakdownAnalytics>(
        `/analytics/breakdown${buildQuery(
            filters
        )}`
    );
}