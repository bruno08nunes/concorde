import type { MouseEventHandler } from "react";

interface ToggleButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text: string;
}

export default function Button({
    onClick,
    text,
}: ToggleButtonProps) {
    return (
        <button
            className={`py-1 px-2 rounded-xl cursor-pointer hover:bg-indigo-600 border-3 border-indigo-600 duration-[.4s]`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
