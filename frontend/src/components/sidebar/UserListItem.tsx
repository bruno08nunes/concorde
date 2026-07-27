import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";

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
                <ProfilePicture imgURL={imgURL} />
                <span className="text-xl">{name}</span>
            </Link>
        </li>
    );
}
