import mongoose from "mongoose";
import type { QueryFilter } from "mongoose";
import type { TransactionDocument } from "../models/Transaction";

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
): QueryFilter<TransactionDocument> {
    const filter: Record<string, unknown> = {};

    if (query.search && typeof query.search === "string" && query.search.trim()) {
        const sanitizedSearch = query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRegex = new RegExp(sanitizedSearch, "i");

        const searchConditions: Record<string, unknown>[] = [
            { user_id: searchRegex },
            { category: searchRegex },
            { status: searchRegex },
        ];

        const numericSearch = Number(query.search.trim());

        if (!Number.isNaN(numericSearch)) {
            searchConditions.push({ id: numericSearch });
        }

        filter.$or = searchConditions;
    }

    if (query.dateFrom || query.dateTo) {
        const dateFilter: Record<string, unknown> = {};

        if (query.dateFrom) {
            const dateFrom = new Date(query.dateFrom);
            if (!Number.isNaN(dateFrom.getTime())) {
                dateFilter.$gte = dateFrom;
            }
        }

        if (query.dateTo) {
            const dateTo = new Date(query.dateTo);
            if (!Number.isNaN(dateTo.getTime())) {
                if (query.dateTo.length === 10) {
                    dateTo.setUTCHours(23, 59, 59, 999);
                }
                dateFilter.$lte = dateTo;
            }
        }

        if (Object.keys(dateFilter).length > 0) {
            filter.date = dateFilter;
        }
    }

    if (query.minAmount || query.maxAmount) {
        const amountFilter: Record<string, unknown> = {};

        if (query.minAmount && !Number.isNaN(Number(query.minAmount))) {
            const val = Number(query.minAmount);
            if (val >= 0) {
                amountFilter.$gte = mongoose.Types.Decimal128.fromString(val.toFixed(2));
            }
        }

        if (query.maxAmount && !Number.isNaN(Number(query.maxAmount))) {
            const val = Number(query.maxAmount);
            if (val >= 0) {
                amountFilter.$lte = mongoose.Types.Decimal128.fromString(val.toFixed(2));
            }
        }

        if (Object.keys(amountFilter).length > 0) {
            filter.amount = amountFilter;
        }
    }

    if (query.category && ["Revenue", "Expense"].includes(query.category)) {
        filter.category = query.category;
    }

    if (query.status && ["Paid", "Pending"].includes(query.status)) {
        filter.status = query.status;
    }

    if (query.userId && typeof query.userId === "string" && query.userId.trim()) {
        filter.user_id = query.userId.trim();
    }

    return filter as QueryFilter<TransactionDocument>;
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