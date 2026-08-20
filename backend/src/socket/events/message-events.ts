import { Server, Socket } from "socket.io";
import orderIds from "../../utils/order-ids";
import messageService from "../../services/message-services";
import z from "zod";

export function registerMessageEvents(io: Server, socket: Socket) {
    socket.on("sendMessage", async (data) => {
        const sendMessageSchema = z.object({
            content: z.string().nullable(),
            type: z.enum(["private", "group"]),
            attachments: z.array(z.object({ fileId: z.int() })),
            receiverId: z.int(),
        });

        const {
            success,
            data: message,
            error,
        } = sendMessageSchema.safeParse(data);

        if (
            !success ||
            (message.attachments.length === 0 && message.content === "")
        ) {
            socket.emit("error", {
                message: "Mensagem inválida",
                errors: error?.flatten(),
            });
            return;
        }

        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            message.receiverId,
        );
        const conversationId = `${firstId}_${secondId}`;

        if (!socket.rooms.has(conversationId)) {
            socket.emit("error", {
                message: "Você não pode enviar mensagem para essa pessoa.",
            });

            return;
        }

        const result = await messageService.createMessage({
            ...message,
            senderId: socket.data.user.id,
            conversationId,
        });

        io.to(conversationId).emit("sendMessage", result);
        io.to(`user:${message.receiverId}`).emit("newMessage", {
            ...result,
        });
    });

    socket.on("userTyping", ({ conversationId }) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversationId,
        );
        const newConversationId = `${firstId}_${secondId}`;
        socket.to(newConversationId).emit("userTyping", {
            userId: socket.data.user.id,
        });
    });

    socket.on("userStopTyping", ({ conversationId }) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversationId,
        );
        const newConversationId = `${firstId}_${secondId}`;
        socket.to(newConversationId).emit("userStopTyping", {
            userId: socket.data.user.id,
        });
    });

    socket.on("userRecording", ({ conversationId }) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversationId,
        );
        const newConversationId = `${firstId}_${secondId}`;
        socket.to(newConversationId).emit("userRecording", {
            userId: socket.data.user.id,
        });
    });

    socket.on("userStopRecording", ({ conversationId }) => {
        const [firstId, secondId] = orderIds(
            socket.data.user.id,
            conversationId,
        );
        const newConversationId = `${firstId}_${secondId}`;
        socket.to(newConversationId).emit("userStopRecording", {
            userId: socket.data.user.id,
        });
    });
}
