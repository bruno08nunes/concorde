import { Bell, Settings } from "lucide-react";
import IconButton from "../IconButton";
import IconLink from "../IconLink";
import FriendList from "./FriendList";
import { useState } from "react";
import UserList from "./UserList";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar() {
    const [search, setSearch] = useState("");
    const [isFriendListActive, setIsFriendListActive] = useState(true);

    return (
        <aside className="bg-slate-800 rounded-lg p-4 flex flex-col gap-4">
            <SidebarHeader
                setSearch={setSearch}
                setIsFriendListActive={setIsFriendListActive}
                isFriendListActive={isFriendListActive}
            />
            <hr />
            <h2 className="text-xl text-center">
                {isFriendListActive ? "Amigos" : "Usuários"}
            </h2>
            {isFriendListActive ? (
                <FriendList search={search} />
            ) : (
                <UserList username={search} />
            )}
            <hr />
            <div className="flex items-center gap-4 p-1">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                    alt=""
                    className="w-12 rounded-full object-cover aspect-square"
                />
                <span className="text-xl flex-1">Nome</span>
                <IconLink to="/notificacoes">
                    <Bell />
                </IconLink>
                <IconButton>
                    <Settings />
                </IconButton>
            </div>
        </aside>
    );
}
