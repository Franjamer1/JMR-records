import { Router } from "express";
import usersRouter from "./userRouter";
import appointmentRouter from "./appointmentsRouter";

const router: Router = Router();


router.use("/users", usersRouter);
router.use("/turns", appointmentRouter)


export default router;