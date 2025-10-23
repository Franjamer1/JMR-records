import { Request, Response } from "express";
import Appointment from "../entities/Appointment";
import {
    getAllAppointmentService,
    createAppointmentService,
    getAppointmentByIdService,
    cancelAppointmentService,
    getAppointmentsForUser,
} from "../services/appointmentsService";
import { AuthRequest } from "../middlewares/authMiddleware";
import User from "../entities/User";

//Get / appointments => obtener el listado de todos los turnos 
// export const getAllAppointment = async (req: Request, res: Response) => {
//     try {
//         const allAppointments: Appointment[] = await getAllAppointmentService();
//         res.status(200).json(allAppointments);
//     } catch (error: any) {
//         res.status(400).json({ error: error.message })
//     }
// }
export const getAllAppointment = async (req: AuthRequest, res: Response) => {
    try {
        // Validamos que el usuario exista en el request (protegido por authMiddleware)
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Obtenemos el usuario del JWT
        const userPayload = req.user;

        // Creamos un objeto compatible con la función getAppointmentsForUser
        const user = {
            id: userPayload.userId,
            role: userPayload.role || "user",
        };

        const appointments: Appointment[] = await getAppointmentsForUser(user as any);

        res.status(200).json(appointments);
    } catch (error) {
        // Evitamos error de TypeScript accediendo a "message"
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message });
    }
};


//Get /appointments/:turnId => Obtener detalle de turno especifico

// export const getAppointmentByid = async (req: Request<{ turnId: string }, {}, {}>, res: Response) => {
//     const { turnId } = req.params;
//     try {
//         const appointment = await getAppointmentByIdService(Number(turnId));
//         res.status(200).json(appointment);
//     } catch (error: any) {
//         res.status(400).json({ error: error.message })
//     };
// };
export const getAppointmentByid = async (req: AuthRequest, res: Response) => {
    const { turnId } = req.params;

    try {
        if (!req.user) throw new Error("Unauthorized");

        const appointment = await getAppointmentByIdService(
            Number(turnId),
            req.user
        );

        res.status(200).json(appointment);
    } catch (error: any) {
        const status =
            error.message === "Forbidden - no tienes permiso para ver este turno"
                ? 403
                : error.message === "Turno inexistente"
                    ? 404
                    : error.message === "Unauthorized"
                        ? 401
                        : 400;

        res.status(status).json({ message: error.message });
    }
}


//POST /appointments/schedule => Agendar un nuevo turno:
export const newAppointment = async (req: Request, res: Response) => {
    const { date, time, userId } = req.body;
    console.log('Request Body en newAppointment:', req.body);
    try {
        const newAppointment: Appointment = await
            createAppointmentService({
                date,
                time,
                userId,
            });
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message })

    };
};

//PUT /appointmens/cancel => cambiar el status de un turno a "cancelled"

export const cancelAppointment = async (req: Request<{ turnId: string }, {}, {}>, res: Response) => {
    const { turnId } = req.params;
    try {
        await cancelAppointmentService(Number(turnId));
        res.status(200).json({ message: "Turno cancelado" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    };
};