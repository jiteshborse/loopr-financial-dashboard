export type TransactionCategory = "Revenue" | "Expense";

export type TransactionStatus = "Paid" | "Pending";

export interface Transaction {
    id: number;
    date: string;
    amount: string;
    category: TransactionCategory;
    status: TransactionStatus;
    user_id: string;
    user_profile: string;
}

export interface TransactionFilters {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    minAmount?: string;
    maxAmount?: string;
    category?: TransactionCategory;
    status?: TransactionStatus;
    userId?: string;
}

export interface TransactionMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface TransactionResponse {
    data: Transaction[];
    meta: TransactionMeta;
    filters: TransactionFilters;
    sort: {
        sortBy: string;
        sortOrder: "asc" | "desc";
    };
}