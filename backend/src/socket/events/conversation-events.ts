import { Server, Socket } from "socket.io";
import orderIds from "../../utils/order-ids";
import PrismaFriendshipRepository from "../../repositories/prisma/prisma-friendship-repository";

const friendshipRepository = new PrismaFriendshipRepository();

export function registerConversationEvents(io: Server, socket: Socket) {
    socket.on("joinConversation", async (conversation) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversation.receiverId,
        );

        const friendship = await friendshipRepository.getActiveFriendship(firstId, secondId);

        if (!friendship) {
            socket.emit("error", {message: "Você não pode entrar nessa conversa!"});
            return;
        }

        const conversationId = `${firstId}_${secondId}`;

        socket.join(conversationId);
        socket.data.currentConversation = conversationId;
    });

    socket.on("leaveConversation", (conversation) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversation.receiverId,
        );
        const conversationId = `${firstId}_${secondId}`;

        socket.to(conversationId).emit("userStopTyping", {
            userId: socket.data.user.id,
        });

        socket.leave(conversationId);
        socket.data.currentConversation = null;
    });
}
