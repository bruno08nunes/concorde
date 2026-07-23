import { Link } from "react-router-dom";

interface UserListItemProps {
    imgURL: string;
    name: string;
}

export default function UserListItem({ imgURL, name }: UserListItemProps) {
    return (
        <Link to={"/"} className="flex items-center gap-4 hover:bg-slate-700 p-1 rounded-2xl cursor-pointer">
            <img
                src={imgURL}
                alt=""
                className="w-12 rounded-full object-cover aspect-square"
            />
            <span className="text-xl">{name}</span>
        </Link>
    );
}
