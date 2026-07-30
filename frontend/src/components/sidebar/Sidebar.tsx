import { Bell, Settings } from "lucide-react";
import IconLink from "../IconLink";
import FriendList from "./FriendList";
import { useState } from "react";
import UserList from "./UserList";
import SidebarHeader from "./SidebarHeader";
import { useAuthStore } from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";

export default function Sidebar() {
    const [search, setSearch] = useState("");
    const [isFriendListActive, setIsFriendListActive] = useState(true);

    const { token, logout } = useAuthStore();
    const { data, error } = useQuery({
        queryKey: ["me"],
        queryFn: () => getMe(token!),
        retry: 0,
    });

    const navigate = useNavigate();
    if (error?.message === "Token inválido.") {
        logout();
        navigate("/login", { replace: true });
    }

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
                <ProfilePicture imgURL={data && data.profilePicture?.url || null} />
                <span className="text-xl flex-1">{data?.username}</span>
                <IconLink to="/notificacoes">
                    <Bell />
                </IconLink>
                <IconLink to="/configuracoes">
                    <Settings />
                </IconLink>
            </div>
        </aside>
    );
}
