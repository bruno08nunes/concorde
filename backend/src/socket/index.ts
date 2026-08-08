import { Server } from "socket.io";
// import { registerEvents } from "./register-events";
import { authSocketMiddleware } from "./middleware";
import { registerEvents } from "./register-events";

export const usersOnline = new Map<number, Set<string>>();

export function configureSocket(io: Server) {
    io.use(authSocketMiddleware);

    io.on("connection", (socket) => {
        console.log("Um usuário se conectou.");

        const userId = socket.data.user.id;

        let sockets = usersOnline.get(userId);
        if (!sockets) {
            sockets = new Set();
            usersOnline.set(userId, sockets);
        }
        sockets.add(socket.id);

        socket.join(`user:${userId}`);

        registerEvents(io, socket);
    });
}
