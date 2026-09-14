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

export async function getTransactionsForExport(
    filters: TransactionQuery = {}
) {
    const pageSize = 100;

    const firstPage = await getTransactions({
        ...filters,
        page: 1,
        pageSize,
    });

    if (firstPage.meta.totalPages <= 1) {
        return firstPage.data;
    }

    const remainingPages = Array.from(
        {
            length:
                firstPage.meta.totalPages - 1,
        },
        (_, index) => index + 2
    );

    const responses = await Promise.all(
        remainingPages.map((page) =>
            getTransactions({
                ...filters,
                page,
                pageSize,
            })
        )
    );

    return [
        ...firstPage.data,
        ...responses.flatMap(
            (response) => response.data
        ),
    ];
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