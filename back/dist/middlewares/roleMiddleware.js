"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role || "")) {
            return res.status(403).json({ message: "Forbidden - insufficient role" });
        }
        next();
    };
};
exports.requireRole = requireRole;
//Uso: router.get("/all", authMiddleware, requireRole(["admin"]), controller).
