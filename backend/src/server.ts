import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDatabase } from "./config/database";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

const app = express();
const port = Number(process.env.PORT ?? 5000);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many login attempts. Please try again after 15 minutes." },
});

// Security & Parsing Middleware
app.use(helmet());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
    cors({
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.includes(origin) ||
                /^http:\/\/localhost:\d+$/.test(origin) ||
                /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
            ) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

// API Routes
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);

// Global Error Handler
app.use(
    (
        error: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        if (error?.type === "entity.parse.failed" || error?.statusCode === 400) {
            return res.status(400).json({
                error: "Malformed JSON payload.",
            });
        }

        console.error("Unhandled error:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
);

async function startServer() {
    await connectDatabase();

    app.listen(port, () => {
        console.log(`Backend running at http://localhost:${port}`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});

export { app };
