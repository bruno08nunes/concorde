import { Mic, Plus } from "lucide-react";
import IconButton from "../IconButton";
import TextArea from "../form/TextArea";
import {
    sendMessageToSocket,
    userStartTyping,
    userStopTyping,
} from "../../lib/socket";
import { useRef, useState } from "react";
import IconLabel from "../IconLabel";
import { uploadFiles } from "../../api/files";
import FilesPlaceholder from "./files/FilesPlaceholder";

export default function MessageForm({ friendId }: { friendId?: number }) {
    const [files, setFiles] = useState<File[]>([]);

    async function handleSubmitMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get("message")?.toString();
        const files = formData.getAll("files");

        const isEmpty =
            (!message || message?.trim() === "") && files.length === 0;

        if (isEmpty || !friendId) {
            return;
        }

        let filesIds: { fileId: number }[] = [];
        if (files.length > 0) {
            filesIds = await uploadFiles(formData);
        }

        sendMessageToSocket({
            content: message,
            type: "private",
            attachments: filesIds,
            receiverId: friendId,
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        const currentTarget = e.currentTarget;

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (!currentTarget || !friendId) {
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
            className="flex flex-col p-3 border m-2 rounded-full gap-2 focus-within:outline-1"
            onSubmit={handleSubmitMessage}
        >
            <FilesPlaceholder files={files} />
            <div className="flex gap-2">
                <IconLabel inputId="files">
                    <input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            if (!e.currentTarget.files) return;

                            setFiles(Array.from(e.currentTarget.files));
                        }}
                    />
                    <Plus />
                </IconLabel>
                <TextArea onKeyDown={handleKeyDown} onInput={handleInput} />
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </form>
    );
}
