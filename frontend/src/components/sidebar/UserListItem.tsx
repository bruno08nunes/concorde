import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import UserOnlineIcon from "../UserOnlineIcon";

interface UserListItemProps {
    imgURL: string | null;
    name: string;
    baseURL: string;
    isOnline?: boolean;
}

export default function UserListItem({
    imgURL,
    name,
    baseURL,
    isOnline
}: UserListItemProps) {
    return (
        <li>
            <Link
                to={baseURL + name}
                className="flex items-center gap-4 hover:bg-slate-700 p-1 rounded-2xl cursor-pointer"
            >
                <div className="relative">
                    <ProfilePicture imgURL={imgURL} />
                    <UserOnlineIcon isOnline={isOnline} />
                </div>
                <span className="text-xl">{name}</span>
            </Link>
        </li>
    );
}
