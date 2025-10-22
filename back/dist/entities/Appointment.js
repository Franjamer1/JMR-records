"use strict";
// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import User from "./User";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @Entity({ name: "appointments" })
// class Appointment {
//     @PrimaryGeneratedColumn()
//     id!: number;
//     @Column()
//     date!: Date;//o string
//     @Column()
//     time!: string;
//     @Column()
//     userId!: number;
//     @Column({
//         default: "active",
//     })
//     status!: string;
//     //Appointment N:1 User
//     @ManyToOne(() => User, (user) => user.appointments)
//     @JoinColumn({ name: "userId" })
//     user!: User;
// }
// export default Appointment;
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
let Appointment = class Appointment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appointment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: "active",
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, (user) => user.appointments),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.default)
], Appointment.prototype, "user", void 0);
Appointment = __decorate([
    (0, typeorm_1.Entity)({ name: "appointments" })
], Appointment);
exports.default = Appointment;
