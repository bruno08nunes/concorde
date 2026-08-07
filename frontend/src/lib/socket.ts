import { io } from "socket.io-client";

export const socket = io("http://localhost:3333", {
    autoConnect: false,
});

export function sendMessageToSocket(data: {
    content: string;
    type: "private" | "group";
    attachments: [];
    receiverId: number;
}) {
    socket.emit("sendMessage", {
        content: data.content,
        type: "private",
        attachments: [],
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
