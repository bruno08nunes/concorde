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

export function userStartRecording(conversationId: number) {
    socket.emit("userRecording", { conversationId });
}

export function userStopRecording(conversationId: number) {
    socket.emit("userStopRecording", { conversationId });
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

export function emitIceCandidate({
    candidate,
    receiverId,
}: {
    receiverId: number;
    candidate: RTCIceCandidate;
}) {
    socket.emit("call:ice-candidate", {
        receiverId,
        candidate,
    });
}

export function emitOffer({
    offer,
    receiverId,
    isVideoCall,
}: {
    offer: RTCSessionDescriptionInit;
    receiverId: number;
    isVideoCall?: boolean;
}) {
    socket.emit("call:offer", {
        receiverId,
        offer,
        isVideoCall,
    });
}

export function emitAnswer({
    answer,
    receiverId,
}: {
    answer: RTCSessionDescriptionInit;
    receiverId: number;
}) {
    socket.emit("call:answer", {
        receiverId,
        answer,
    });
}

export function rejectCallSocket({ receiverId }: { receiverId: number }) {
    socket.emit("call:reject", {
        receiverId,
    });
}

export function endCallSocket({ receiverId }: { receiverId: number }) {
    socket.emit("call:end", {
        receiverId,
    });
}

export function emitMute({
    receiverId,
    muted,
}: {
    receiverId: number;
    muted: boolean;
}) {
    socket.emit("call:mute", {
        receiverId,
        muted,
    });
}

export function emitCamera({
    receiverId,
    enabled,
}: {
    receiverId: number;
    enabled: boolean;
}) {
    socket.emit("call:camera", { receiverId, enabled });
}
