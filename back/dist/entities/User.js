"use strict";
// import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import Credential from "./Credential";
// import Appointment from "./Appointment";
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
exports.UserRole = void 0;
// @Entity({ name: "users" })
// class User {
//     @PrimaryGeneratedColumn()
//     id!: number;
//     @Column()
//     name!: string;
//     @Column()
//     email!: string;
//     @Column()
//     birthdate!: string;
//     @Column()
//     nDni!: string;
//     //User 1:1 Credential
//     @OneToOne(() => Credential)
//     @JoinColumn()
//     credential!: Credential;
//     //User 1:N Appointment
//     @OneToMany(
//         () => Appointment,
//         (appointment) => appointment.userId
//     )
//     appointments!: Appointment[];
// }
// export default User;
const typeorm_1 = require("typeorm");
const Credential_1 = __importDefault(require("./Credential"));
const Appointment_1 = __importDefault(require("./Appointment"));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "nDni", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Credential_1.default, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Credential_1.default)
], User.prototype, "credential", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Appointment_1.default, (appointment) => appointment.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "appointments", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "users" })
], User);
exports.default = User;
