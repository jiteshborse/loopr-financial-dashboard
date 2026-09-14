import request from "../../services/api";
import type {
    TransactionFilters,
    TransactionResponse,
} from "../../types/transaction";

export interface TransactionQuery
    extends TransactionFilters {
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    pageSize?: number;
}

export async function getTransactions(
    query: TransactionQuery = {}
): Promise<TransactionResponse> {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            params.set(key, String(value));
        }
    });

    const queryString = params.toString();

    return request<TransactionResponse>(
        `/transactions${queryString ? `?${queryString}` : ""}`
    );
}