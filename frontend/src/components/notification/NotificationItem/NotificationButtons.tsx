import type { ReactNode } from "react";

export default function NotificationButtons({
    children,
}: {
    children: ReactNode;
}) {
    return <div className="flex gap-4">{children}</div>;
}
