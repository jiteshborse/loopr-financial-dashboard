import {
    Router,
    type Request,
    type Response,
    type NextFunction
} from "express";

import { Transaction } from "../models/Transaction";
import { requireAuth } from "../middleware/authMiddleware";
import { buildTransactionFilter } from "../utils/transactionFilters";

const router = Router();

function decimalToString(
    value: unknown
): string {
    if (
        value &&
        typeof value === "object" &&
        "toString" in value
    ) {
        return String(value);
    }

    return "0.00";
}

// ---------------------------------------
// Summary
// ---------------------------------------

router.get(
    "/summary",
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

            const result =
                await Transaction.aggregate([
                    {
                        $match: filter
                    },

                    {
                        $group: {
                            _id: null,

                            revenue: {
                                $sum: {
                                    $cond: [
                                        {
                                            $eq: [
                                                "$category",
                                                "Revenue"
                                            ]
                                        },
                                        "$amount",
                                        0
                                    ]
                                }
                            },

                            expenses: {
                                $sum: {
                                    $cond: [
                                        {
                                            $eq: [
                                                "$category",
                                                "Expense"
                                            ]
                                        },
                                        "$amount",
                                        0
                                    ]
                                }
                            },

                            pending: {
                                $sum: {
                                    $cond: [
                                        {
                                            $eq: [
                                                "$status",
                                                "Pending"
                                            ]
                                        },
                                        "$amount",
                                        0
                                    ]
                                }
                            },

                            transactionCount: {
                                $sum: 1
                            }
                        }
                    },

                    {
                        $project: {
                            _id: 0,
                            revenue: 1,
                            expenses: 1,
                            pending: 1,
                            transactionCount: 1,

                            net: {
                                $subtract: [
                                    "$revenue",
                                    "$expenses"
                                ]
                            }
                        }
                    }
                ]);

            const summary =
                result[0] ?? {
                    revenue: "0.00",
                    expenses: "0.00",
                    pending: "0.00",
                    net: "0.00",
                    transactionCount: 0
                };

            return res.json({
                revenue:
                    decimalToString(
                        summary.revenue
                    ),

                expenses:
                    decimalToString(
                        summary.expenses
                    ),

                net:
                    decimalToString(
                        summary.net
                    ),

                pending:
                    decimalToString(
                        summary.pending
                    ),

                transactionCount:
                    summary.transactionCount
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

// ---------------------------------------
// Trends
// ---------------------------------------

router.get(
    "/trends",
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

            const data =
                await Transaction.aggregate([
                    {
                        $match: filter
                    },

                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m",
                                    date: "$date",
                                    timezone: "UTC"
                                }
                            },

                            revenue: {
                                $sum: {
                                    $cond: [
                                        {
                                            $eq: [
                                                "$category",
                                                "Revenue"
                                            ]
                                        },
                                        "$amount",
                                        0
                                    ]
                                }
                            },

                            expenses: {
                                $sum: {
                                    $cond: [
                                        {
                                            $eq: [
                                                "$category",
                                                "Expense"
                                            ]
                                        },
                                        "$amount",
                                        0
                                    ]
                                }
                            }
                        }
                    },

                    {
                        $sort: {
                            _id: 1
                        }
                    },

                    {
                        $project: {
                            _id: 0,

                            month: "$_id",

                            revenue: 1,

                            expenses: 1
                        }
                    }
                ]);

            return res.json({
                data: data.map(
                    (item) => ({
                        month: item.month,

                        revenue:
                            decimalToString(
                                item.revenue
                            ),

                        expenses:
                            decimalToString(
                                item.expenses
                            )
                    })
                )
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

// ---------------------------------------
// Breakdown
// ---------------------------------------

router.get(
    "/breakdown",
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

            const result =
                await Transaction.aggregate([
                    {
                        $match: filter
                    },

                    {
                        $facet: {
                            category: [
                                {
                                    $group: {
                                        _id: "$category",

                                        amount: {
                                            $sum: "$amount"
                                        },

                                        count: {
                                            $sum: 1
                                        }
                                    }
                                },

                                {
                                    $sort: {
                                        amount: -1
                                    }
                                },

                                {
                                    $project: {
                                        _id: 0,

                                        name: "$_id",

                                        amount: 1,

                                        count: 1
                                    }
                                }
                            ],

                            status: [
                                {
                                    $group: {
                                        _id: "$status",

                                        amount: {
                                            $sum: "$amount"
                                        },

                                        count: {
                                            $sum: 1
                                        }
                                    }
                                },

                                {
                                    $sort: {
                                        amount: -1
                                    }
                                },

                                {
                                    $project: {
                                        _id: 0,

                                        name: "$_id",

                                        amount: 1,

                                        count: 1
                                    }
                                }
                            ]
                        }
                    }
                ]);

            const breakdown =
                result[0] ?? {
                    category: [],
                    status: []
                };

            return res.json({
                category:
                    breakdown.category.map(
                        (item: {
                            name: string;
                            amount: unknown;
                            count: number;
                        }) => ({
                            name: item.name,

                            amount:
                                decimalToString(
                                    item.amount
                                ),

                            count: item.count
                        })
                    ),

                status:
                    breakdown.status.map(
                        (item: {
                            name: string;
                            amount: unknown;
                            count: number;
                        }) => ({
                            name: item.name,

                            amount:
                                decimalToString(
                                    item.amount
                                ),

                            count: item.count
                        })
                    )
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