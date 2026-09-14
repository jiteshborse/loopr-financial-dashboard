import { Router } from "express";
import type { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { requireAuth } from "../middleware/authMiddleware";
import {
  buildTransactionFilter,
  getSort,
  type TransactionQuery,
} from "../utils/transactionFilters";

const router = Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const query = req.query as TransactionQuery;

    const page = Math.max(Number(query.page) || 1, 1);

    const requestedPageSize = Number(query.pageSize) || 25;
    const pageSize = Math.min(Math.max(requestedPageSize, 1), 100);

    const filter = buildTransactionFilter(query);

    const sortBy = query.sortBy || "date";
    const sortOrder = query.sortOrder || "desc";

    const sort = getSort(sortBy, sortOrder);

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),

      Transaction.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    const formattedTransactions = transactions.map((tx) => ({
      ...tx,
      amount: (tx.amount as any)?.toString() ?? "0.00",
    }));

    res.json({
      data: formattedTransactions,
      meta: {
        page,
        pageSize,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      filters: {
        search: query.search || null,
        dateFrom: query.dateFrom || null,
        dateTo: query.dateTo || null,
        minAmount: query.minAmount || null,
        maxAmount: query.maxAmount || null,
        category: query.category || null,
        status: query.status || null,
        userId: query.userId || null,
      },
      sort: {
        sortBy,
        sortOrder: sortOrder === "asc" ? "asc" : "desc",
      },
    });
  } catch (error) {
    console.error("Transaction query error:", error);

    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
});

export default router;