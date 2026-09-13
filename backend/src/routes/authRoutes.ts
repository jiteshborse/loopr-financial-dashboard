import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { createAccessToken } from "../utils/auth";
import { requireAuth, type AuthenticatedRequest } from "../middleware/authMiddleware";

const router = Router();

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                error: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password."
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                error: "Invalid email or password."
            });
        }

        const token = createAccessToken({
            userId: user._id.toString(),
            role: user.role
        });

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            message: "Login successful.",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", (_req, res) => {
    res.clearCookie("accessToken");

    return res.json({
        message: "Logout successful."
    });
});

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const user = await User.findById(req.user?.userId).select(
            "_id email role"
        );

        if (!user) {
            return res.status(401).json({
                error: "User no longer exists."
            });
        }

        return res.json({
            user
        });
    } catch (error) {
        next(error);
    }
});

export default router;