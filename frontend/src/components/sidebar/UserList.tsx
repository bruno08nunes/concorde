import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../api/friendships";
import { useAuthStore } from "../../stores/authStore";
import UserListItem from "./UserListItem";

export default function UserList() {
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
                    <div
                        className="w-12 rounded-full object-cover aspect-square bg-slate-600 animate-pulse"
                    />
                    <div className="bg-slate-600 animate-pulse flex-1 rounded-full m-3 ml-0"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Erro ao carregar amigos!</div>;
    }

    return (
        <ul className="flex-1 flex flex-col gap-3 overflow-auto">
            {friends?.map((friendship) => (
                <UserListItem
                    key={friendship.friendshipId}
                    imgURL={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                    }
                    name={friendship.friend.username}
                />
            ))}
        </ul>
    );
}
