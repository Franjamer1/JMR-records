import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user || !roles.includes(user.role || "")) {
            return res.status(403).json({ message: "Forbidden - insufficient role" });
        }
        next();
    };
};


//Uso: router.get("/all", authMiddleware, requireRole(["admin"]), controller).