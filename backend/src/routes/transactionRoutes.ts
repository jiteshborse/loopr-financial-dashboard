import {
  Router,
  type Request,
  type Response,
  type NextFunction
} from "express";

import { Transaction } from "../models/Transaction";
import { requireAuth } from "../middleware/authMiddleware";

import {
  buildTransactionFilter,
  getSort
} from "../utils/transactionFilters";

const router = Router();

function parsePositiveInteger(
  value: unknown,
  defaultValue: number,
  maxValue?: number
): number {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    return defaultValue;
  }

  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 1
  ) {
    return defaultValue;
  }

  if (maxValue !== undefined) {
    return Math.min(
      parsed,
      maxValue
    );
  }

  return parsed;
}

router.get(
  "/",
  requireAuth,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filter =
        buildTransactionFilter(
          req.query
        );

      const {
        sortBy,
        sortOrder,
        sort
      } = getSort(req.query);

      const page =
        parsePositiveInteger(
          req.query.page,
          1
        );

      const pageSize =
        parsePositiveInteger(
          req.query.pageSize,
          25,
          100
        );

      const skip =
        (page - 1) *
        pageSize;

      const [
        transactions,
        total
      ] = await Promise.all([
        Transaction.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(pageSize)
          .lean(),

        Transaction.countDocuments(
          filter
        )
      ]);

      const totalPages =
        Math.ceil(
          total / pageSize
        );

      const data =
        transactions.map(
          (transaction) => ({
            ...transaction,
            amount:
              transaction.amount.toString(),
            date:
              transaction.date.toISOString()
          })
        );

      return res.json({
        data,
        meta: {
          page,
          pageSize,
          total,
          totalPages,
          hasNextPage:
            page < totalPages,
          hasPreviousPage:
            page > 1
        },
        filters: req.query,
        sort: {
          sortBy,
          sortOrder
        }
      });
    } catch (error) {
      if (
        error instanceof Error
      ) {
        return res.status(400).json({
          error: error.message
        });
      }

      next(error);
    }
  }
);

export default router;