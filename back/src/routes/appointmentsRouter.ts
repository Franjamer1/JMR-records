import { Router } from "express";
import { getAllAppointment, getAppointmentByid, newAppointment, cancelAppointment } from "../controllers/appointmentsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const appointmentRouter = Router();

appointmentRouter.get("/", authMiddleware, requireRole(["admin"]), getAllAppointment);
appointmentRouter.get("/:turnId", authMiddleware, requireRole(["user", "admin"]), getAppointmentByid);
appointmentRouter.post("/schedule", authMiddleware, requireRole(["user", "admin"]), newAppointment);
appointmentRouter.put("/cancel/:turnId", authMiddleware, requireRole(["user", "admin"]), cancelAppointment);

export default appointmentRouter;