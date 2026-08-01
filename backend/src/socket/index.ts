import { Server } from "socket.io";
// import { registerEvents } from "./register-events";
import { authSocketMiddleware } from "./middleware";
import { registerEvents } from "./register-events";

export function configureSocket(io: Server) {
    io.use(authSocketMiddleware);

    io.on("connection", (socket) => {
        console.log("Um usuário se conectou.");
        
        registerEvents(io, socket);
    });
}
