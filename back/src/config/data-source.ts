import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./envs";
import User from "../entities/User";
import Appointment from "../entities/Appointment";
import Credential from "../entities/Credential";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true, //puede pasarse a true
    dropSchema: true, //idem
    logging: ["error"], //true
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})

