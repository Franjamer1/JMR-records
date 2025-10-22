import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export interface AuthPayload {
    userId: number;
    role?: string;
}

export interface AuthRequest extends Request {
    user?: AuthPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid Authorization format. Use: Bearer <token>" });
    }

    const token = parts[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
