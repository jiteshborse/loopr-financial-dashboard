import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import transactionRoutes from "./routes/transactionRoutes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

const app = express();
const port = Number(process.env.PORT ?? 5000);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false
});

app.use(helmet());
app.use("/api/analytics", analyticsRoutes);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(
  "/api/analytics",
  analyticsRoutes
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.use(
    (
        error: unknown,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error(error);
        res.status(500).json({
            error: "Internal server error"
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
