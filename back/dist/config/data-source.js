"use strict";
// import { DataSource } from "typeorm";
// import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./envs";
// import User from "../entities/User";
// import Appointment from "../entities/Appointment";
// import Credential from "../entities/Credential";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: DB_HOST,
//     port: Number(DB_PORT),
//     username: DB_USER,
//     password: DB_PASS,
//     database: DB_NAME,
//     synchronize: true, //puede pasarse a true
//     dropSchema: false, //idem
//     logging: ["error"], //true
//     entities: [User, Appointment, Credential],
//     subscribers: [],
//     migrations: [],
// })
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = __importDefault(require("../entities/User"));
const Appointment_1 = __importDefault(require("../entities/Appointment"));
const Credential_1 = __importDefault(require("../entities/Credential"));
const isProduction = !!envs_1.DATABASE_URL;
exports.AppDataSource = new typeorm_1.DataSource(isProduction
    ? {
        type: "postgres",
        url: envs_1.DATABASE_URL, // Neon connection string
        synchronize: false,
        logging: ["error"],
        ssl: {
            rejectUnauthorized: false, // obligatorio para Neon
        },
        entities: [User_1.default, Appointment_1.default, Credential_1.default],
    }
    : {
        type: "postgres",
        host: envs_1.DB_HOST,
        port: Number(envs_1.DB_PORT),
        username: envs_1.DB_USER,
        password: envs_1.DB_PASS,
        database: envs_1.DB_NAME,
        synchronize: true,
        logging: ["error"],
        entities: [User_1.default, Appointment_1.default, Credential_1.default],
    });
