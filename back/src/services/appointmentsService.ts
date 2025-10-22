import Appointment from "../entities/Appointment";
import User, { UserRole } from "../entities/User";
import IScheduleAppointmentDto from "../dto/IScheduleAppointmentDto";
import { appointmentsModel, userModel } from "../repositories";

export const createAppointmentService = async (scheduleturnDto: IScheduleAppointmentDto): Promise<Appointment> => {
    console.log("datos recibidos en createAppointmentService", scheduleturnDto)//log depuracion
    const user: User | null = await userModel.findOneBy({ id: scheduleturnDto.userId });
    // if (!user) throw Error("Usuario inexistente");
    if (!user) {
        console.error("Usuario inexistente"); // Log de depuración
        throw Error("Usuario inexistente");
    }
    const newAppointment: Appointment = appointmentsModel.create(scheduleturnDto);
    await appointmentsModel.save(newAppointment);
    newAppointment.user = user;
    await appointmentsModel.save(newAppointment);
    return newAppointment
};

export const getAllAppointmentService = async (): Promise<Appointment[]> => {
    const allAppointments: Appointment[] = await appointmentsModel.find()
    return allAppointments;
}

//traer appointments para el admin, modificar para usar jwt
export const getAppointmentsForUser = async (user: User): Promise<Appointment[]> => {
    if (user.role === UserRole.ADMIN) {
        // admin ve todas las citas
        return appointmentsModel.find({ relations: ["user"] });
    } else {
        // usuario normal solo ve sus citas
        return appointmentsModel.find({
            where: { userId: user.id },
            relations: ["user"]
        });
    }
};

export const getAppointmentByIdService = async (turnId: number): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentsModel.findOneBy({ id: turnId, });
    if (!appointment) throw Error("Turno inexistente");
    return appointment;
};

export const cancelAppointmentService = async (
    turnId: number
): Promise<void> => {
    const appointment: Appointment | null = await
        appointmentsModel.findOneBy({
            id: turnId,
        });
    if (!appointment) throw Error("Turno inexistente");
    appointment.status = "Cancelled";
    await appointmentsModel.save(appointment);
};


