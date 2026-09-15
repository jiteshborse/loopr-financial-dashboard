import type { NextFunction, Request, Response, RequestHandler } from "express";
import { verifyAccessToken } from "../utils/auth";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: string;
            };
            cookies?: Record<string, string | undefined>;
        }
    }
}

export type AuthenticatedRequest = Request;

export const requireAuth: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        let token = req.cookies?.accessToken;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.slice(7).trim();
        }

        if (!token) {
            res.status(401).json({
                error: "Authentication required."
            });
            return;
        }

        const payload = verifyAccessToken(token);

        req.user = {
            userId: payload.userId,
            role: payload.role
        };

        next();
    } catch {
        res.status(401).json({
            error: "Invalid or expired authentication token."
        });
        return;
    }
};