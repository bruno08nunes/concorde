import { Mic } from "lucide-react";
import IconButton from "../../IconButton";
import TextArea from "../../form/TextArea";
import {
    sendMessageToSocket,
    userStartTyping,
    userStopTyping,
} from "../../../lib/socket";
import { useRef, useState } from "react";
import { uploadFiles } from "../../../api/files";
import FilesPlaceholder from "../files/FilesPlaceholder";
import SpeechRecognitionButton from "./SpeechRecognitionButton";
import FileInput from "../../form/FileInput";

export default function MessageForm({ friendId }: { friendId?: number }) {
    const [files, setFiles] = useState<File[]>([]);
    const [text, setText] = useState("");
    const [isRecordingTranscription, setIsRecordingTranscription] =
        useState(false);

    async function handleSubmitMessage(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        e.currentTarget.reset();
        setText("");
        setIsRecordingTranscription(false);

        const isEmpty = text.trim() === "" && files.length === 0;
        if (isEmpty || !friendId) {
            return;
        }

        let filesIds: { fileId: number }[] = [];
        if (files.length > 0) {
            filesIds = await uploadFiles(formData);
            setFiles([]);
        }

        sendMessageToSocket({
            content: text,
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
            e.currentTarget.style.height = "auto";
            return;
        }
    }

    const isTyping = useRef(false);
    function handleInput(e: React.InputEvent<HTMLTextAreaElement>) {
        setText(e.currentTarget.value);
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

    function handleRecord(text: string) {
        setText(text);

        if (text && !isTyping.current) {
            isTyping.current = true;
            userStartTyping(friendId!);
        }

        if (!text && isTyping.current) {
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
            <div className="flex gap-2 items-center">
                <FileInput setFiles={setFiles} />
                <TextArea
                    onKeyDown={handleKeyDown}
                    onInput={handleInput}
                    value={text}
                />
                <SpeechRecognitionButton
                    onRecord={handleRecord}
                    isRecording={isRecordingTranscription}
                    onRecordingChange={setIsRecordingTranscription}
                />
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </form>
    );
}
