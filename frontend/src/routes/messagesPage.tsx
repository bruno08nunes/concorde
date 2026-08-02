import { useParams } from "react-router-dom";
import { useSocketEvent } from "../hooks/useSocketEvent";
import { useAuthStore } from "../stores/authStore";
import { getUserByUsername } from "../api/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Messages from "../components/messages/Messages";
import MessagePageHeader from "../components/messages/MessagePageHeader";
import MessageForm from "../components/messages/MessageForm";
import { useConversationRoom } from "../hooks/useConversationRoom";

export default function MessagesPage() {
    const { username } = useParams();
    const { user, token } = useAuthStore();

    const queryClient = useQueryClient();
    useSocketEvent("sendMessage", () => {
        // TODO: Melhorar método para mostrar mensagens no evento
        queryClient.invalidateQueries({ queryKey: ["messages"] });
    });

    const { data: friend } = useQuery({
        queryKey: ["user-info", username],
        queryFn: () => getUserByUsername(username!, token!),
    });

    useConversationRoom(friend?.id);

    return (
        <>
            <MessagePageHeader username={username!} />
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
