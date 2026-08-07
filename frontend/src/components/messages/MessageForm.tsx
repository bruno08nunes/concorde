import { Mic, Plus } from "lucide-react";
import IconButton from "../IconButton";
import TextArea from "../form/TextArea";
import { sendMessageToSocket, userStartTyping, userStopTyping } from "../../lib/socket";
import { useRef } from "react";

export default function MessageForm({ friendId }: { friendId?: number }) {
    function handleSubmitMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const message = new FormData(e.target).get("message")?.toString();

        if (!message || message.trim() === "" || !friendId) {
            return;
        }

        sendMessageToSocket({
            content: message,
            type: "private",
            attachments: [],
            receiverId: friendId,
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        const currentTarget = e.currentTarget;

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (!currentTarget || currentTarget.value.trim() === "" || !friendId) {
                return;
            }

            const form = currentTarget.form;
            if (form) {
                form.requestSubmit();
            }

            e.currentTarget.value = "";
            userStopTyping(friendId);
            isTyping.current = false;
            return;
        }
    }

    const isTyping = useRef(false);
    function handleInput(e: React.InputEvent<HTMLTextAreaElement>) {
        const value = e.currentTarget.value.trim();

        if (value && !isTyping.current) {
            isTyping.current = true;
            userStartTyping(friendId!);
        }

        if (!value && isTyping.current) {
            isTyping.current = false;
            userStopTyping(friendId!);
        }
    }

    return (
        <form
            className="flex p-3 border m-2 rounded-full gap-2 focus-within:outline-1"
            onSubmit={handleSubmitMessage}
        >
            <IconButton>
                <Plus />
            </IconButton>
            <TextArea onKeyDown={handleKeyDown} onInput={handleInput} />
            <IconButton>
                <Mic />
            </IconButton>
        </form>
    );
}
