import { FilterQuery } from "mongoose";
import { TransactionDocument } from "../models/Transaction";

export interface TransactionQuery {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    minAmount?: string;
    maxAmount?: string;
    category?: string;
    status?: string;
    userId?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
    pageSize?: string;
}

export function buildTransactionFilter(
    query: TransactionQuery
): FilterQuery<TransactionDocument> {
    const filter: FilterQuery<TransactionDocument> = {};

    if (query.search) {
        const searchRegex = new RegExp(query.search, "i");

        const searchConditions: FilterQuery<TransactionDocument>[] = [
            { user_id: searchRegex },
            { category: searchRegex },
            { status: searchRegex },
        ];

        const numericSearch = Number(query.search);

        if (!Number.isNaN(numericSearch)) {
            searchConditions.push({ id: numericSearch });
        }

        filter.$or = searchConditions;
    }

    if (query.dateFrom || query.dateTo) {
        filter.date = {};

        if (query.dateFrom) {
            filter.date.$gte = new Date(query.dateFrom);
        }

        if (query.dateTo) {
            const dateTo = new Date(query.dateTo);

            if (query.dateTo.length === 10) {
                dateTo.setUTCHours(23, 59, 59, 999);
            }

            filter.date.$lte = dateTo;
        }
    }

    if (query.minAmount || query.maxAmount) {
        filter.amount = {};

        if (query.minAmount) {
            filter.amount.$gte = query.minAmount;
        }

        if (query.maxAmount) {
            filter.amount.$lte = query.maxAmount;
        }
    }

    if (query.category) {
        filter.category = query.category;
    }

    if (query.status) {
        filter.status = query.status;
    }

    if (query.userId) {
        filter.user_id = query.userId;
    }

    return filter;
}

export function getSort(
    sortBy = "date",
    sortOrder = "desc"
): Record<string, 1 | -1> {
    const allowedSortFields: Record<string, string> = {
        id: "id",
        date: "date",
        amount: "amount",
        category: "category",
        status: "status",
        userId: "user_id",
    };

    const field = allowedSortFields[sortBy] ?? "date";
    const order = sortOrder === "asc" ? 1 : -1;

    return {
        [field]: order,
    };
}