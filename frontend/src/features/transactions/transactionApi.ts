import { apiFetch } from "../../services/api";
import type {
    TransactionFilters,
    TransactionResponse
} from "../../types/transaction";

export interface TransactionQuery
    extends TransactionFilters {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    pageSize?: number;
}

function buildQuery(
    params: TransactionQuery
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

export function getTransactions(
    params: TransactionQuery = {}
) {
    return apiFetch<TransactionResponse>(
        `/transactions${buildQuery(params)}`
    );
}