import { Fragment } from "react/jsx-runtime";
import type { SendMessage } from "../../types/messages";
import Message from "./Message";
import MessagesDate from "./MessagesDate";

interface MessagesListProps {
    messages?: SendMessage[];
    userId: number;
}

export default function MessagesList({ messages, userId }: MessagesListProps) {
    return messages?.map((message, index) => {
        const previous = messages[index - 1];

        const showDate =
            !previous ||
            new Date(previous.createdAt).toDateString() !==
                new Date(message.createdAt).toDateString();

        return (
            <Fragment key={message._id}>
                {showDate && (
                    <MessagesDate date={message.createdAt} />
                )}

                <Message
                    message={message.content ?? ""}
                    isOwnMessage={message.senderId === userId}
                    date={message.createdAt}
                    files={message.attachments}
                />
            </Fragment>
        );
    });
}
