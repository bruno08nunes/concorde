import type { ReactNode } from "react";

interface IconButtonProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isActive?: boolean;
}

export default function IconButton({
    children,
    onClick,
    isActive,
}: IconButtonProps) {
    const className = isActive ? "bg-indigo-700 hover:bg-indigo-900" : "hover:bg-slate-700";

    return (
        <button
            className={"cursor-pointer  p-2 rounded-full " + className}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
