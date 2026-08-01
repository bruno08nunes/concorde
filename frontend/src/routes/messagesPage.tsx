import { LucideUserPlus2, Mic, PhoneCall, Plus, Video } from "lucide-react";
import IconButton from "../components/IconButton";
import Message from "../components/messages/Message";
import TextArea from "../components/form/TextArea";
import { useParams } from "react-router-dom";
import { socket } from "../lib/socket";
import { useSocketEvent } from "../hooks/useSocketEvent";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { getUserByUsername } from "../api/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../api/messages";

export default function MessagesPage() {
    const { username } = useParams();
    const { user, token } = useAuthStore();

    const queryClient = useQueryClient();

    useSocketEvent("sendMessage", () => {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
    });

    const { data: friend } = useQuery({
        queryKey: ["user-info", username],
        queryFn: () => getUserByUsername(username!, token!),
    });

    const { data: messages } = useQuery({
        queryKey: ["messages", friend?.id],
        queryFn: () => getMessages(friend!.id, token!),
    });

    useEffect(() => {
        // TODO: Fazer com que ao dar f5 ele mostre corretamente
        if (!friend || !user) {
            return;
        }

        socket.emit("joinConversation", {
            senderId: user.id,
            receiverId: friend.id,
        });

        return () => {
            socket.emit("leaveConversation", {
                receiverId: friend.id,
            });
        };
    }, [friend, user]);

    function handleSubmitMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const message = new FormData(e.target).get("message")?.toString();

        if (!message || message.trim() === "" || !friend) {
            return;
        }

        socket.emit("sendMessage", {
            content: message,
            type: "private",
            attachments: [],
            receiverId: friend.id,
        });
    }

    return (
        <>
            <header className="flex items-center p-3 justify-between">
                <span className="flex items-center gap-4">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                        alt=""
                        className="w-12 rounded-full object-cover aspect-square"
                    />
                    <span className="text-xl flex-1">{username}</span>
                </span>
                <div className="flex gap-3">
                    <IconButton>
                        <PhoneCall />
                    </IconButton>
                    <IconButton>
                        <Video />
                    </IconButton>
                    <IconButton>
                        <LucideUserPlus2 />
                    </IconButton>
                </div>
            </header>
            <hr />
            <div className="flex flex-col p-3 gap-2 flex-1 overflow-auto">
                {messages?.map((message) => (
                    <Message
                        key={message._id}
                        message={message.content ?? ""}
                        isOwnMessage={message.senderId === user!.id}
                    />
                ))}
            </div>
            <hr />
            <form
                className="flex p-3 border m-2 rounded-full gap-2 focus-within:outline-1"
                onSubmit={handleSubmitMessage}
            >
                <IconButton>
                    <Plus />
                </IconButton>
                <TextArea />
                <IconButton>
                    <Mic />
                </IconButton>
            </form>
        </>
    );
}
