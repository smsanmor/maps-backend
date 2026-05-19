import { Server } from "socket.io";
import { Server as Engine } from "@socket.io/bun-engine";
import { SERVER_CONFIG } from "./config/server-config";



export const creareServer = () => {
  
const io = new Server();

const engine = new Engine({ 
  path: SERVER_CONFIG.path,
  cors: { origin: true, credentials: true },
});

io.bind(engine);


io.on("connection", (socket) => {
  console.log(`Cliente conectado: (socket.id): ${ socket.id }`);

});

io.on("disconnect", (socket) => {
  console.log(`Cliente desconectado (socket.id): ${ socket.id }`);
});


const { fetch: engineFetch, websocket } = engine.handler();

const server = Bun.serve({
  port: SERVER_CONFIG.port,
  idleTimeout: SERVER_CONFIG.idleTimeout,
  websocket,
  fetch(req: Request, server: Parameters<typeof engineFetch>[1]) {
    const url = new URL(req.url);

    if (url.pathname === SERVER_CONFIG.path) {
      return engineFetch(req, server);
    }

    return new Response(
        Bun.file("public/index.html"),
        {
            headers: { "Content-Type": "text/html; charset=utf-8" }, 
        }
    );

  },
});

return server;

}