import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../api/friendships";
import { useAuthStore } from "../../stores/authStore";
import UserListItem from "./UserListItem";
import { useSocketEvent } from "../../hooks/useSocketEvent";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function FriendList({ search }: { search: string }) {
    const { token } = useAuthStore();
    const { username: usernameParam } = useParams();

    const {
        data: friends,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["friends"],
        queryFn: () => getFriends(token!),
    });
    const [usersWithUnreadMessages, setUsersWithUnreadMessages] = useState<
        Set<number>
    >(new Set());

    const user = friends?.find(
        (friendship) => friendship.friend.username === usernameParam,
    )?.friend;
    
    if (user?.id && usersWithUnreadMessages.has(user.id)) {
        setUsersWithUnreadMessages((users) => {
            if (!users.has(user.id)) {
                return users;
            }

            const next = new Set(users);
            next.delete(user.id);
            return next;
        });
    }

    useSocketEvent("newMessage", ({ senderId }) => {
        setUsersWithUnreadMessages((users) => {
            const newUsers = new Set(users);
            newUsers.add(senderId);
            return newUsers;
        });
    });

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-3 overflow-auto">
                <div className="flex gap-4 p-1">
                    <div className="w-12 rounded-full object-cover aspect-square bg-slate-600 animate-pulse" />
                    <div className="bg-slate-600 animate-pulse flex-1 rounded-full m-3 ml-0"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="flex-1 overflow-auto">Erro ao carregar amigos!</p>;
    }

    if (friends?.length === 0) {
        return <p className="flex-1 overflow-auto">Nenhum amigo :(</p>;
    }

    const filteredFriends = friends?.filter((friendship) =>
        friendship.friend.username.includes(search),
    );

    if (filteredFriends?.length === 0) {
        return <p className="flex-1 overflow-auto">Nenhum amigo encontrado</p>;
    }

    return (
        <ul className="flex-1 flex flex-col gap-3 overflow-auto">
            {filteredFriends?.map((friendship) => (
                <UserListItem
                    key={friendship.friendshipId}
                    baseURL="/amigos/"
                    imgURL={friendship.friend.profilePictureUrl}
                    name={friendship.friend.username}
                    isOnline={friendship.friend.isOnline}
                    hasNewMessages={usersWithUnreadMessages.has(
                        friendship.friend.id,
                    )}
                />
            ))}
        </ul>
    );
}
