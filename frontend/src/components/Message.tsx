interface MessageProps {
    name?: string;
    message: string;
    isOwnMessage?: boolean;
}

export default function Message({ name, message, isOwnMessage }: MessageProps) {
    return (
        <div className={`w-fit p-2 rounded-3xl ${isOwnMessage ? "bg-indigo-700 rounded-br-none self-end" : "bg-slate-700 rounded-bl-none"}`}>
            {!!name && (
                <>
                    <span className="text-sm text-green-500">{name}</span>
                    <br />
                </>
            )}
            {message}
        </div>
    );
}
