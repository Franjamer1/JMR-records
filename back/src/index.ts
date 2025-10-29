import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import "reflect-metadata";

AppDataSource.initialize()
    .then(() => {
        console.log("✅ Base de datos conectada correctamente");
        server.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => console.error("❌ Error al conectar la base de datos:", error));

