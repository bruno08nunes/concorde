import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface UserListItemProps {
    imgURL: string | null;
    name: string;
    baseURL: string;
}

export default function UserListItem({ imgURL, name, baseURL }: UserListItemProps) {
    return (
        <li>
            <Link
                to={baseURL + name}
                className="flex items-center gap-4 hover:bg-slate-700 p-1 rounded-2xl cursor-pointer"
            >
                {imgURL ? (
                    <img
                        src={imgURL}
                        alt=""
                        className="w-12 rounded-full object-cover aspect-square"
                    />
                ) : (
                    <UserCircle className="w-12 h-12" />
                )}
                <span className="text-xl">{name}</span>
            </Link>
        </li>
    );
}
