import type { ReactNode } from "react";

export default function IconLabel({ children, inputId }: { children: ReactNode, inputId: string }) {
    return (
        <label className="cursor-pointer hover:bg-slate-700 p-2 rounded-full" htmlFor={inputId}>
            {children}
        </label>
    );
}
