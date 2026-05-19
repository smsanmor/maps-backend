import { creareServer } from "./server";

const configServer = creareServer();

console.log(`Servidor corriendo en el puerto: ${ configServer.port }`);