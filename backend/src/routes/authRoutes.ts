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

        // Record last login timestamp in MongoDB
        user.lastLogin = new Date();
        await user.save();

        const token = createAccessToken({
            userId: user._id.toString(),
            role: user.role
        });

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                title: user.title,
                lastLogin: user.lastLogin,
            }
        });
    } catch (error) {
        next(error);
    }
});

router.post("/logout", (_req, res) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });

    return res.json({
        message: "Logout successful."
    });
});

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const user = await User.findById(req.user?.userId).select(
            "_id name email role location title lastLogin"
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

router.patch("/me", requireAuth, async (req: AuthenticatedRequest, res, next) => {
    try {
        const { name, location } = req.body;
        const user = await User.findById(req.user?.userId);

        if (!user) {
            return res.status(401).json({
                error: "User no longer exists."
            });
        }

        if (typeof name === "string" && name.trim()) {
            user.name = name.trim();
        }

        if (typeof location === "string" && location.trim()) {
            user.location = location.trim();
        }

        await user.save();

        return res.json({
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                location: user.location,
                title: user.title,
                lastLogin: user.lastLogin,
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;