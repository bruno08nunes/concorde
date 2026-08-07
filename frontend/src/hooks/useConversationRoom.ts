import { useEffect } from "react";
import { joinConversation, leaveConversation } from "../lib/socket";

export function useConversationRoom(receiverId?: number) {
    useEffect(() => {
        if (!receiverId) {
            return;
        }

        joinConversation(receiverId);

        return () => {
            leaveConversation(receiverId);
        };
    }, [receiverId]);
}
