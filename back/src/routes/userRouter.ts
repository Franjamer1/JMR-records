import { Router } from "express";
import { createUser, getAllUsers, getUserById, loginUser } from "../controllers/userController";
// import { register } from "module";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);


export default usersRouter;