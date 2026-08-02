import { Mic, Plus } from "lucide-react";
import IconButton from "../IconButton";
import TextArea from "../form/TextArea";
import { socket } from "../../lib/socket";

export default function MessageForm({ friendId }: {friendId?: number}) {
    function handleSubmitMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const message = new FormData(e.target).get("message")?.toString();

        if (!message || message.trim() === "" || !friendId) {
            return;
        }

        socket.emit("sendMessage", {
            content: message,
            type: "private",
            attachments: [],
            receiverId: friendId,
        });
    }

    return (
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
    );
}
