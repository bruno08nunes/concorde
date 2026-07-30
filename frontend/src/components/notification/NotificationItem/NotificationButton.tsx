import type { MouseEventHandler, ReactNode } from "react";

export default function NotificationButton({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            className="border p-1 cursor-pointer rounded-lg hover:outline-1"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
