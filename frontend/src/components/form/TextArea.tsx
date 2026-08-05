import { useRef, type TextareaHTMLAttributes } from "react";

export default function TextArea({
    onKeyDown,
    onInput
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function handleInput(e: React.InputEvent<HTMLTextAreaElement>) {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
        onInput?.(e);
    }

    return (
        <textarea
            ref={textareaRef}
            id="message"
            name="message"
            className="flex-1 p-1 focus:outline-0 overflow-y-auto max-h-48 resize-none h-9.5"
            onInput={handleInput}
            placeholder="Digite uma mensagem..."
            rows={1}
            onKeyDown={onKeyDown}
        ></textarea>
    );
}
