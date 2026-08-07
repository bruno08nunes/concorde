import { Server, Socket } from "socket.io";
import { usersOnline } from "..";

export function registerPresenceEvents(io: Server, socket: Socket) {
    socket.on("disconnect", () => {
        const {
            currentConversation,
            user: { id: userId },
        } = socket.data;

        socket.to(currentConversation).emit("userStopTyping", {
            userId: socket.data.user.id,
        });

        const sockets = usersOnline.get(userId);
        if (!sockets) {
            return;
        }

        sockets.delete(socket.id);

        if (sockets.size === 0) {
            usersOnline.delete(userId);
        }
    });
}
