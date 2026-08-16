import type { ChatFile } from "../../types/files";
import { formatHour } from "../../utils/date";
import MessageFile from "./files/MessageFile";

interface MessageProps {
    name?: string;
    message: string;
    isOwnMessage?: boolean;
    date?: string;
    files: { file?: ChatFile; fileId: number }[];
}

export default function Message({
    name,
    message,
    isOwnMessage,
    date,
    files,
}: MessageProps) {
    return (
        <div
            className={`w-fit p-3 px-4 rounded-3xl max-w-150 wrap-anywhere ${isOwnMessage ? "bg-indigo-700 rounded-br-none self-end" : "bg-slate-700 rounded-bl-none"}`}
        >
            {!!name && (
                <>
                    <span className="text-sm text-green-500">{name}</span>
                    <br />
                </>
            )}
            <div className="flex flex-col gap-4">
                {files?.map(({ file }) => (
                    <MessageFile key={file?.id} file={file} />
                ))}
            </div>
            {message}
            {date && (
                <div className="text-xs text-slate-300 text-right">
                    {formatHour(date)}
                </div>
            )}
        </div>
    );
}
