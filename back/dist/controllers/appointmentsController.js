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
exports.cancelAppointment = exports.newAppointment = exports.getAppointmentByid = exports.getAllAppointment = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
//Get / appointments => obtener el listado de todos los turnos 
const getAllAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield (0, appointmentsService_1.getAllAppointmentService)();
        res.status(200).json(allAppointments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllAppointment = getAllAppointment;
//Get /appointments/:turnId => Obtener detalle de turno especifico
const getAppointmentByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { turnId } = req.params;
    try {
        const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(Number(turnId));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    ;
});
exports.getAppointmentByid = getAppointmentByid;
//POST /appointments/schedule => Agendar un nuevo turno:
const newAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = req.body;
    console.log('Request Body en newAppointment:', req.body);
    try {
        const newAppointment = yield (0, appointmentsService_1.createAppointmentService)({
            date,
            time,
            userId,
        });
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    ;
});
exports.newAppointment = newAppointment;
//PUT /appointmens/cancel => cambiar el status de un turno a "cancelled"
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { turnId } = req.params;
    try {
        yield (0, appointmentsService_1.cancelAppointmentService)(Number(turnId));
        res.status(200).json({ message: "Turno cancelado" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    ;
});
exports.cancelAppointment = cancelAppointment;
