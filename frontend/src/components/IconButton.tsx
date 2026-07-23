import type { ReactNode } from "react";

export default function IconButton({ children }: { children: ReactNode }) {
    return (
        <button className="cursor-pointer hover:bg-slate-700 p-2 rounded-full">
            {children}
        </button>
    );
}
