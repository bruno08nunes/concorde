import { Server, Socket } from "socket.io";
import orderIds from "../../utils/order-ids";

export function registerConversationEvents(io: Server, socket: Socket) {
    // TODO: Fazer verificações se o usuário pode entrar na conversa e pode enviar mensagens
    socket.on("joinConversation", (conversation) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversation.receiverId,
        );
        const conversationId = `${firstId}_${secondId}`;

        socket.join(conversationId);
    });

    socket.on("leaveConversation", (conversation) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversation.receiverId,
        );
        const conversationId = `${firstId}_${secondId}`;

        socket.leave(conversationId);
    });
}
