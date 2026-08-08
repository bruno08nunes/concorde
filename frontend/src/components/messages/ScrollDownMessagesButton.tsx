import { ArrowDownCircle } from "lucide-react";

export default function ScrollDownMessagesButton({
    onClick,
    hasNewMessages,
}: {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    hasNewMessages: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className="bg-white p-1 rounded-full cursor-pointer z-10 sticky top-0 size-9 flex justify-center items-center"
        >
            <ArrowDownCircle
                size={32}
                color={hasNewMessages ? "#4f39f6" : "black"}
            />
            {hasNewMessages && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-600" />
            )}
        </button>
    );
}
