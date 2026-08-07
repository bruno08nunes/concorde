import { Server, Socket } from "socket.io";

export function registerPresenceEvents(io: Server, socket: Socket) {
    socket.on("disconnect", () => {
        const { currentConversation } = socket.data;

        socket.to(currentConversation).emit("userStopTyping", {
            userId: socket.data.user.id,
        });
    });
}
