import type { ReactNode } from "react";

export default function NotificationRoot({
    children,
}: {
    children: ReactNode;
}) {
    return <div className="flex items-center justify-between border p-2 rounded-2xl gap-6">{children}</div>;
}
