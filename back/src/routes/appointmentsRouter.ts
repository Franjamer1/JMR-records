import { Router } from "express";
import { getAllAppointment, getAppointmentByid, newAppointment, cancelAppointment } from "../controllers/appointmentsController";
import { authMiddleware } from "../middlewares/authMiddleware";

const appointmentRouter = Router();

appointmentRouter.get("/", authMiddleware, getAllAppointment);
appointmentRouter.get("/:turnId", authMiddleware, getAppointmentByid);
appointmentRouter.post("/schedule", authMiddleware, newAppointment);
appointmentRouter.put("/cancel/:turnId", authMiddleware, cancelAppointment);

export default appointmentRouter;