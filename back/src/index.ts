import server from "./server";
import { DB_HOST, DB_PORT, PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import "reflect-metadata";
import { error } from "console";

AppDataSource.initialize()
    .then(() => {
        console.log(`Base de datos conectada en puerto ${DB_PORT}`)
        server.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        })
    })
    .catch((error) => console.log(error));



// server.listen(PORT, () => {
//     console.log(`Servidor escuchando en el puerto ${PORT}`);
// });