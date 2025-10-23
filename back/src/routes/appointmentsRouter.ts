import { Router } from "express";
import { getAllAppointment, getAppointmentByid, newAppointment, cancelAppointment } from "../controllers/appointmentsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const appointmentRouter = Router();

appointmentRouter.get("/", authMiddleware, requireRole(["ADMIN"]), getAllAppointment);
appointmentRouter.get("/:turnId", authMiddleware, requireRole(["USER", "ADMIN"]), getAppointmentByid);
appointmentRouter.post("/schedule", authMiddleware, requireRole(["USER", "ADMIN"]), newAppointment);
appointmentRouter.put("/cancel/:turnId", authMiddleware, requireRole(["USER", "ADMIN"]), cancelAppointment);

export default appointmentRouter;