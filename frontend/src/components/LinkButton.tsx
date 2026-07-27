import { Link } from "react-router-dom";

interface ToggleButtonProps {
    to: string;
    text: string;
}

export default function LinkButton({ to, text }: ToggleButtonProps) {
    return (
        <Link
            to={to}
            className={`py-1 px-2 rounded-xl cursor-pointer hover:bg-indigo-600 border-3 border-indigo-600 duration-[.4s]`}
        >
            {text}
        </Link>
    );
}
