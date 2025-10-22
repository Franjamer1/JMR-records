"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
const data_source_1 = require("./config/data-source");
require("reflect-metadata");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log(`Base de datos conectada en puerto ${envs_1.DB_PORT}`);
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${envs_1.PORT}`);
    });
})
    .catch((error) => console.log(error));
// server.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${PORT}`);
// });
