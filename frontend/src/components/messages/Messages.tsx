import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import Message from "./Message";

export default function Messages({
    token,
    receiverId,
    userId
}: {
    token: string;
    receiverId: number;
    userId: number;
}) {
    const { data: messages } = useQuery({
        queryKey: ["messages", receiverId],
        queryFn: () => getMessages(receiverId, token),
    });

    return (
        <div className="flex flex-col p-3 gap-2 flex-1 overflow-auto">
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
