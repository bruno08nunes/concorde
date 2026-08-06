import Message from "./Message";

export default function TypingMessage() {
    return (
        <div className="animate-pulse">
            <Message message=". . ." />
        </div>
    );
}
