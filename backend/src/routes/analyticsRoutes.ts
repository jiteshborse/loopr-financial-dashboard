import { Router, Request, Response } from "express";
import Transaction from "../models/Transaction";
import { requireAuth } from "../middleware/authMiddleware";
import {
    buildTransactionFilter,
    TransactionQuery,
} from "../utils/transactionFilters";

const router = Router();

/**
 * GET /api/analytics/summary
 *
 * Returns:
 * - Revenue
 * - Expenses
 * - Net
 * - Pending
 * - Transaction count
 */
router.get("/summary", requireAuth, async (req: Request, res: Response) => {
    try {
        const query = req.query as TransactionQuery;

        const filter = buildTransactionFilter(query);

        const [result] = await Transaction.aggregate([
            {
                $match: filter,
            },
            {
                $group: {
                    _id: null,

                    revenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$category", "Revenue"] },
                                "$amount",
                                0,
                            ],
                        },
                    },

                    expenses: {
                        $sum: {
                            $cond: [
                                { $eq: ["$category", "Expense"] },
                                "$amount",
                                0,
                            ],
                        },
                    },

                    pending: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "Pending"] },
                                "$amount",
                                0,
                            ],
                        },
                    },

                    transactionCount: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    revenue: 1,
                    expenses: 1,
                    pending: 1,
                    transactionCount: 1,

                    net: {
                        $subtract: ["$revenue", "$expenses"],
                    },
                },
            },
        ]);

        if (!result) {
            return res.json({
                revenue: "0.00",
                expenses: "0.00",
                net: "0.00",
                pending: "0.00",
                transactionCount: 0,
            });
        }

        res.json({
            revenue: result.revenue.toString(),
            expenses: result.expenses.toString(),
            net: result.net.toString(),
            pending: result.pending.toString(),
            transactionCount: result.transactionCount,
        });
    } catch (error) {
        console.error("Analytics summary error:", error);

        res.status(500).json({
            message: "Failed to calculate analytics summary",
        });
    }
});

/**
 * GET /api/analytics/trends
 *
 * Returns monthly revenue and expense trends.
 */
router.get("/trends", requireAuth, async (req: Request, res: Response) => {
    try {
        const query = req.query as TransactionQuery;

        const filter = buildTransactionFilter(query);

        const data = await Transaction.aggregate([
            {
                $match: filter,
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$date",
                            timezone: "UTC",
                        },
                    },

                    revenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$category", "Revenue"] },
                                "$amount",
                                0,
                            ],
                        },
                    },

                    expenses: {
                        $sum: {
                            $cond: [
                                { $eq: ["$category", "Expense"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    revenue: 1,
                    expenses: 1,
                },
            },
        ]);

        res.json({
            data: data.map((item) => ({
                month: item.month,
                revenue: item.revenue.toString(),
                expenses: item.expenses.toString(),
            })),
        });
    } catch (error) {
        console.error("Analytics trends error:", error);

        res.status(500).json({
            message: "Failed to calculate analytics trends",
        });
    }
});

/**
 * GET /api/analytics/breakdown
 *
 * Returns category and status breakdowns.
 */
router.get(
    "/breakdown",
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            const query = req.query as TransactionQuery;

            const filter = buildTransactionFilter(query);

            const [result] = await Transaction.aggregate([
                {
                    $match: filter,
                },
                {
                    $facet: {
                        category: [
                            {
                                $group: {
                                    _id: "$category",

                                    amount: {
                                        $sum: "$amount",
                                    },

                                    count: {
                                        $sum: 1,
                                    },
                                },
                            },
                            {
                                $sort: {
                                    amount: -1,
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    name: "$_id",
                                    amount: 1,
                                    count: 1,
                                },
                            },
                        ],

                        status: [
                            {
                                $group: {
                                    _id: "$status",

                                    amount: {
                                        $sum: "$amount",
                                    },

                                    count: {
                                        $sum: 1,
                                    },
                                },
                            },
                            {
                                $sort: {
                                    amount: -1,
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    name: "$_id",
                                    amount: 1,
                                    count: 1,
                                },
                            },
                        ],
                    },
                },
            ]);

            if (!result) {
                return res.json({
                    category: [],
                    status: [],
                });
            }

            res.json({
                category: result.category.map((item: any) => ({
                    name: item.name,
                    amount: item.amount.toString(),
                    count: item.count,
                })),

                status: result.status.map((item: any) => ({
                    name: item.name,
                    amount: item.amount.toString(),
                    count: item.count,
                })),
            });
        } catch (error) {
            console.error("Analytics breakdown error:", error);

            res.status(500).json({
                message: "Failed to calculate analytics breakdown",
            });
        }
    }
);

export default router;