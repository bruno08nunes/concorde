import { io } from "socket.io-client";
import { env } from "./env";

export const socket = io(env.VITE_API_URL, {
    autoConnect: false,
});

export function sendMessageToSocket(data: {
    content?: string;
    type: "private" | "group";
    attachments?: { fileId: number }[];
    receiverId: number;
}) {
    socket.emit("sendMessage", {
        content: data.content,
        type: "private",
        attachments: data.attachments,
        receiverId: data.receiverId,
    });
}

export function userStartTyping(conversationId: number) {
    socket.emit("userTyping", { conversationId });
}

export function userStopTyping(conversationId: number) {
    socket.emit("userStopTyping", { conversationId });
}

export function joinConversation(conversationId: number) {
    socket.emit("joinConversation", {
        receiverId: conversationId,
    });
}

export function leaveConversation(conversationId: number) {
    socket.emit("leaveConversation", {
        receiverId: conversationId,
    });
}
