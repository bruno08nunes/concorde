import { useEffect } from "react";
import { socket } from "../lib/socket";

export function useConversationRoom(receiverId?: number) {
    useEffect(() => {
        if (!receiverId) {
            return;
        }

        socket.emit("joinConversation", {
            receiverId,
        });

        return () => {
            socket.emit("leaveConversation", {
                receiverId,
            });
        };
    }, [receiverId]);
}
