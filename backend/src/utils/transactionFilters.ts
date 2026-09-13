import mongoose from "mongoose";

export type TransactionQuery = Record<string, unknown>;

export const SORT_FIELDS = {
    id: "id",
    date: "date",
    amount: "amount",
    category: "category",
    status: "status",
    userId: "user_id"
} as const;

export type SortField = keyof typeof SORT_FIELDS;

function parseAmount(
    value: unknown
): mongoose.Types.Decimal128 | null {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    const number = Number(value);

    if (!Number.isFinite(number) || number < 0) {
        return null;
    }

    return mongoose.Types.Decimal128.fromString(
        number.toFixed(2)
    );
}

function parseDate(
    value: unknown,
    endOfDay = false
): Date | null {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    if (
        endOfDay &&
        /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
        date.setUTCHours(23, 59, 59, 999);
    }

    return date;
}

export function buildTransactionFilter(
    query: TransactionQuery
): Record<string, unknown> {
    const {
        search,
        dateFrom,
        dateTo,
        minAmount,
        maxAmount,
        category,
        status,
        userId
    } = query;

    const filter: Record<string, unknown> = {};

    // -----------------------------
    // Search
    // -----------------------------

    if (
        typeof search === "string" &&
        search.trim()
    ) {
        const searchValue = search.trim();

        const searchConditions: Record<string, unknown>[] = [
            {
                user_id: {
                    $regex: searchValue,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: searchValue,
                    $options: "i"
                }
            },
            {
                status: {
                    $regex: searchValue,
                    $options: "i"
                }
            }
        ];

        const numericSearch = Number(searchValue);

        if (Number.isFinite(numericSearch)) {
            searchConditions.push({
                id: numericSearch
            });

            searchConditions.push({
                amount:
                    mongoose.Types.Decimal128.fromString(
                        numericSearch.toFixed(2)
                    )
            });
        }

        filter.$or = searchConditions;
    }

    // -----------------------------
    // Date
    // -----------------------------

    const parsedDateFrom = parseDate(dateFrom);
    const parsedDateTo = parseDate(dateTo, true);

    if (
        dateFrom &&
        !parsedDateFrom
    ) {
        throw new Error(
            "Invalid dateFrom. Use YYYY-MM-DD or a valid date."
        );
    }

    if (
        dateTo &&
        !parsedDateTo
    ) {
        throw new Error(
            "Invalid dateTo. Use YYYY-MM-DD or a valid date."
        );
    }

    if (
        parsedDateFrom &&
        parsedDateTo &&
        parsedDateFrom > parsedDateTo
    ) {
        throw new Error(
            "dateFrom cannot be later than dateTo."
        );
    }

    if (
        parsedDateFrom ||
        parsedDateTo
    ) {
        const dateFilter: Record<string, Date> = {};

        if (parsedDateFrom) {
            dateFilter.$gte = parsedDateFrom;
        }

        if (parsedDateTo) {
            dateFilter.$lte = parsedDateTo;
        }

        filter.date = dateFilter;
    }

    // -----------------------------
    // Amount
    // -----------------------------

    const parsedMinAmount =
        parseAmount(minAmount);

    const parsedMaxAmount =
        parseAmount(maxAmount);

    if (
        minAmount &&
        !parsedMinAmount
    ) {
        throw new Error(
            "Invalid minAmount."
        );
    }

    if (
        maxAmount &&
        !parsedMaxAmount
    ) {
        throw new Error(
            "Invalid maxAmount."
        );
    }

    if (
        parsedMinAmount &&
        parsedMaxAmount &&
        Number(minAmount) >
        Number(maxAmount)
    ) {
        throw new Error(
            "minAmount cannot be greater than maxAmount."
        );
    }

    if (
        parsedMinAmount ||
        parsedMaxAmount
    ) {
        const amountFilter: Record<
            string,
            mongoose.Types.Decimal128
        > = {};

        if (parsedMinAmount) {
            amountFilter.$gte =
                parsedMinAmount;
        }

        if (parsedMaxAmount) {
            amountFilter.$lte =
                parsedMaxAmount;
        }

        filter.amount = amountFilter;
    }

    // -----------------------------
    // Category
    // -----------------------------

    if (category !== undefined) {
        if (
            category !== "Revenue" &&
            category !== "Expense"
        ) {
            throw new Error(
                "category must be Revenue or Expense."
            );
        }

        filter.category = category;
    }

    // -----------------------------
    // Status
    // -----------------------------

    if (status !== undefined) {
        if (
            status !== "Paid" &&
            status !== "Pending"
        ) {
            throw new Error(
                "status must be Paid or Pending."
            );
        }

        filter.status = status;
    }

    // -----------------------------
    // User
    // -----------------------------

    if (
        typeof userId === "string" &&
        userId.trim()
    ) {
        filter.user_id =
            userId.trim();
    }

    return filter;
}

export function getSort(
    query: TransactionQuery
) {
    const requestedSortBy =
        typeof query.sortBy === "string"
            ? query.sortBy
            : "date";

    const requestedSortOrder =
        typeof query.sortOrder === "string"
            ? query.sortOrder
            : "desc";

    if (
        !(requestedSortBy in SORT_FIELDS)
    ) {
        throw new Error(
            `Invalid sortBy. Allowed values: ${Object.keys(
                SORT_FIELDS
            ).join(", ")}.`
        );
    }

    if (
        requestedSortOrder !== "asc" &&
        requestedSortOrder !== "desc"
    ) {
        throw new Error(
            "sortOrder must be asc or desc."
        );
    }

    return {
        sortBy: requestedSortBy,
        sortOrder: requestedSortOrder,
        sort: {
            [SORT_FIELDS[
                requestedSortBy as SortField
            ]]:
                requestedSortOrder === "asc"
                    ? 1
                    : -1
        }
    };
}