import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../api/friendships";
import { useAuthStore } from "../../stores/authStore";
import UserListItem from "./UserListItem";

export default function FriendList({ search }: { search: string }) {
    const { token } = useAuthStore();

    const {
        data: friends,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["friends"],
        queryFn: () => getFriends(token!),
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
                    imgURL={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                    }
                    name={friendship.friend.username}
                    isOnline={friendship.friend.isOnline}
                />
            ))}
        </ul>
    );
}
