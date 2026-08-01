import { useRef } from "react";

export default function TextArea() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function handleInput() {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const currentTarget = e.currentTarget;
            if (!currentTarget) {
                return;
            }

            const form = currentTarget.form;
            if (form) {
                form.requestSubmit();
            }

            e.currentTarget.value = "";
        }
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
            onKeyDown={handleKeyDown}
        ></textarea>
    );
}
