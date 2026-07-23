import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function IconLink({ children, to }: { children: ReactNode, to: string }) {
    return (
        <Link to={to} className="cursor-pointer hover:bg-slate-700 p-2 rounded-full">
            {children}
        </Link>
    );
}
