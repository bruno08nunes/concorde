import { useQuery } from "@tanstack/react-query";
import UserListItem from "./UserListItem";
import { getUsersByUsername } from "../../api/users";
import { useDebounce } from "../../hooks/useDebounce";

export default function UserList({ username }: { username: string }) {
    const debouncedUsername = useDebounce(username, 200);

    const {
        data: users,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["users", debouncedUsername],
        queryFn: () => getUsersByUsername(debouncedUsername),
        enabled: debouncedUsername.trim().length >= 3 && debouncedUsername.trim().length <= 20
    });

    if (debouncedUsername.length < 3) {
        return <p className="flex-1 overflow-auto">Pesquise pelo usuário que deseja encontrar!</p>;
    }
    
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
        return <div>Erro ao carregar amigos!</div>;
    }

    if (users?.length === 0) {
        return <p className="flex-1 overflow-auto">Nenhum usuário encontrado!</p>;
    }
    
    return (
        <ul className="flex-1 flex flex-col gap-3 overflow-auto">
            {users?.map((user) => (
                <UserListItem
                    key={user.id}
                    baseURL="/usuarios/"
                    imgURL={user.profilePictureUrl}
                    name={user.username}
                />
            ))}
        </ul>
    );
}
