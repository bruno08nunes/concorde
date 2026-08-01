import { Server, Socket } from "socket.io";
import orderIds from "../../utils/order-ids";

export function registerMessageEvents(io: Server, socket: Socket) {
    socket.on("sendMessage", (msg) => {
        const [firstId, secondId] = orderIds(socket.data.user.id, msg.receiverId);
        const conversationId = `${firstId}_${secondId}`;

        if (!socket.rooms.has(conversationId)) {
            socket.emit("error", {message: "Você não pode enviar mensagem para essa pessoa."});
        }

        io.to(conversationId).emit("sendMessage", {
            ...msg,
            senderId: socket.data.user.id,
        });
    });
}
