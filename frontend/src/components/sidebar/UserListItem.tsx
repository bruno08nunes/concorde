import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import UserOnlineIcon from "../UserOnlineIcon";

interface UserListItemProps {
    imgURL: string | null;
    name: string;
    baseURL: string;
    isOnline?: boolean;
    hasNewMessages?: boolean;
}

export default function UserListItem({
    imgURL,
    name,
    baseURL,
    isOnline,
    hasNewMessages,
}: UserListItemProps) {
    return (
        <li>
            <Link
                to={baseURL + name}
                className="flex justify-between items-center hover:bg-slate-700 p-1 rounded-2xl cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ProfilePicture imgURL={imgURL} />
                        <UserOnlineIcon isOnline={isOnline} />
                    </div>
                    <span className="text-xl">{name}</span>
                </div>
                {hasNewMessages && (
                    <span className="w-3 h-3 rounded-full bg-indigo-600" />
                )}
            </Link>
        </li>
    );
}
