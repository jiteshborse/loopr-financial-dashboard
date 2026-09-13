import jwt from "jsonwebtoken";

type JwtPayload = {
    userId: string;
    role: string;
};

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined.");
    }

    return secret;
}

export function createAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: process.env.JWT_EXPIRES_IN ?? "1d"
    } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, getJwtSecret()) as JwtPayload;
}