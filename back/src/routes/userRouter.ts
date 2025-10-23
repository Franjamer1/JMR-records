import { Router } from "express";
import { createUser, getAllUsers, getUserById, loginUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";
// import { register } from "module";

const usersRouter = Router();

usersRouter.get("/", authMiddleware, requireRole(["admin"]), getAllUsers);
usersRouter.get("/:id", authMiddleware, requireRole(["user", "admin"]), getUserById);
usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);


export default usersRouter;