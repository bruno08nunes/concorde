import { useParams } from "react-router-dom";
import { useSocketEvent } from "../hooks/useSocketEvent";
import { useAuthStore } from "../stores/authStore";
import { getUserByUsername } from "../api/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Messages from "../components/messages/Messages";
import MessagePageHeader from "../components/messages/MessagePageHeader";
import MessageForm from "../components/messages/form/MessageForm";
import { useConversationRoom } from "../hooks/useConversationRoom";
import type { SendMessage } from "../types/messages";
import useTitle from "../hooks/useTitle";

export default function MessagesPage() {
    const { username } = useParams();
    const { user, token } = useAuthStore();

    const { data: friend } = useQuery({
        queryKey: ["user-info", username],
        queryFn: () => getUserByUsername(username!, token!),
    });

    const queryClient = useQueryClient();
    useSocketEvent("sendMessage", (message) => {
        queryClient.setQueryData(
            ["messages", friend!.id],
            (oldData: { pages: SendMessage[][] }) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page, index) => {
                        if (index !== 0) return page;

                        const messages = [...page, message];

                        return messages;
                    }),
                };
            },
        );
    });

    useConversationRoom(friend?.id);
    useTitle(friend?.username ? "Conversa com " + friend.username : "Conversa");

    return (
        <>
            <MessagePageHeader
                username={username!}
                isOnline={friend?.isOnline}
                conversationId={friend?.id}
            />
            <hr />
            {friend && (
                <Messages
                    receiverId={friend.id}
                    token={token!}
                    userId={user!.id}
                />
            )}
            <hr />
            <MessageForm friendId={friend?.id} />
        </>
    );
}
