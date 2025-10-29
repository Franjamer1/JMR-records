"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsForUser = exports.getAllAppointmentService = exports.createAppointmentService = void 0;
const User_1 = require("../entities/User");
const repositories_1 = require("../repositories");
const createAppointmentService = (scheduleturnDto) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("datos recibidos en createAppointmentService", scheduleturnDto); //log depuracion
    const user = yield repositories_1.userModel.findOneBy({ id: scheduleturnDto.userId });
    // if (!user) throw Error("Usuario inexistente");
    if (!user) {
        console.error("Usuario inexistente"); // Log de depuración
        throw Error("Usuario inexistente");
    }
    const newAppointment = repositories_1.appointmentsModel.create(scheduleturnDto);
    yield repositories_1.appointmentsModel.save(newAppointment);
    newAppointment.user = user;
    yield repositories_1.appointmentsModel.save(newAppointment);
    return newAppointment;
});
exports.createAppointmentService = createAppointmentService;
const getAllAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield repositories_1.appointmentsModel.find();
    return allAppointments;
});
exports.getAllAppointmentService = getAllAppointmentService;
//traer appointments para el admin, modificar para usar jwt
const getAppointmentsForUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === User_1.UserRole.ADMIN) {
        // admin ve todas las citas
        return repositories_1.appointmentsModel.find({ relations: ["user"] });
    }
    else {
        // usuario normal solo ve sus citas
        return repositories_1.appointmentsModel.find({
            where: { userId: user.id },
            relations: ["user"]
        });
    }
});
exports.getAppointmentsForUser = getAppointmentsForUser;
// export const getAppointmentByIdService = async (turnId: number): Promise<Appointment> => {
//     const appointment: Appointment | null = await appointmentsModel.findOneBy({ id: turnId, });
//     if (!appointment) throw Error("Turno inexistente");
//     return appointment;
// };
const getAppointmentByIdService = (turnId, requestingUser) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield repositories_1.appointmentsModel.findOne({
        where: { id: turnId },
        relations: ["user"],
    });
    if (!appointment)
        throw Error("Turno inexistente");
    //si no es admin y no es dueño del turno
    if (requestingUser.role !== User_1.UserRole.ADMIN && appointment.user.id !== requestingUser.userId) {
        throw Error("Forbidden - no tienes permiso para ver este turno");
    }
    return appointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const cancelAppointmentService = (turnId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield repositories_1.appointmentsModel.findOneBy({
        id: turnId,
    });
    if (!appointment)
        throw Error("Turno inexistente");
    appointment.status = "Cancelled";
    yield repositories_1.appointmentsModel.save(appointment);
});
exports.cancelAppointmentService = cancelAppointmentService;
