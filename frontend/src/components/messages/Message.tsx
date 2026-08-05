import { formatHour } from "../../utils/date";

interface MessageProps {
    name?: string;
    message: string;
    isOwnMessage?: boolean;
    date: string;
}

export default function Message({
    name,
    message,
    isOwnMessage,
    date,
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
            {message}
            <div className="text-xs text-slate-300 text-right">
                {formatHour(date)}
            </div>
        </div>
    );
}
