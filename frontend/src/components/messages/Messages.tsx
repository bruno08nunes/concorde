import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import Message from "./Message";
import { useChatScroll } from "../../hooks/useChatScroll";
import { Loader2 } from "lucide-react";

export default function Messages({
    token,
    receiverId,
    userId,
}: {
    token: string;
    receiverId: number;
    userId: number;
}) {
    const { data: messages, isLoading } = useQuery({
        queryKey: ["messages", receiverId],
        queryFn: () => getMessages(receiverId, token),
    });

    const chatRef = useChatScroll(messages, receiverId);

    return (
        <div
            className="flex flex-col p-3 gap-2 flex-1 overflow-auto custom-scrollbar"
            ref={chatRef}
        >
            {isLoading && (
                <div className="justify-center flex items-center h-full">
                    <Loader2 className="animate-spin" size={40} />
                </div>
            )}
            {messages?.length === 0 && (
                <div className="text-center text-xl">Nenhuma mensagem. Inicie a conversa.</div>
            )}
            {messages?.map((message) => (
                <Message
                    key={message._id}
                    message={message.content ?? ""}
                    isOwnMessage={message.senderId === userId}
                />
            ))}
        </div>
    );
}
