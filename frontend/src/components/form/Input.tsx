import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    errorMessage?: string;
}

export default function Input({
    label,
    id,
    errorMessage,
    type = "text",
    ...rest
}: InputProps) {
    return (
        <div className="flex flex-col gap-2 grow">
            {label !== undefined && (
                <label htmlFor={id} className="text-lavender-blush text-xl">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={id}
                className={`bg-white p-1.5 rounded-md border text-black ${errorMessage ? "text-red-600 decoration-wavy underline" : ""}`}
                {...rest}
            />
            <p className="text-red-600">{errorMessage}</p>
        </div>
    );
}
