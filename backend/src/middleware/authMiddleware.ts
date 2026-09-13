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
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                error: "Authentication required."
            });
        }

        const payload = verifyAccessToken(token);

        req.user = {
            userId: payload.userId,
            role: payload.role
        };

        next();
    } catch {
        return res.status(401).json({
            error: "Invalid or expired authentication token."
        });
    }
}