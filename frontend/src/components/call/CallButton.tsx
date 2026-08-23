import type { ReactNode } from "react";

interface CallButtonProps {
    children?: ReactNode;
    activeElement?: ReactNode;
    inactiveElement?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isActive?: boolean;
}

export default function CallButton({
    children,
    activeElement,
    inactiveElement,
    onClick,
    isActive,
}: CallButtonProps) {
    const className = !isActive && "text-red-600";

    if (!children && !activeElement && !inactiveElement) {
        throw new Error("Erro ao renderizar botão.");
    }

    return (
        <button
            className={"cursor-pointer  p-2 rounded-full hover:bg-slate-600 " + className}
            type="button"
            onClick={onClick}
        >
            {children}
            {isActive ? activeElement : inactiveElement}
        </button>
    );
}
