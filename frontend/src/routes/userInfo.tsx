import { useParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { getUserByUsername } from "../api/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProfilePicture from "../components/ProfilePicture";
import LinkButton from "../components/LinkButton";
import Button from "../components/form/Button";
import { sendFriendshipRequest } from "../api/friendships";
import { toast } from "sonner";

export default function UserInfo() {
    const { username } = useParams();
    const { token } = useAuthStore();

    const {
        data: user,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["user-info", username],
        queryFn: () => getUserByUsername(username!, token!),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: sendFriendshipRequest,
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["friends"]});
            queryClient.invalidateQueries({queryKey: ["user-info"]});
        },
        onError(err) {
            toast(err.message, {
                style: { color: "red" },
                position: "top-center",
            });
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col w-[80%] mx-auto p-10 gap-4 h-full text-lg">
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-slate-600 animate-pulse w-24 h-24 rounded-full"></div>
                    <div className="text-4xl">
                        <div className="w-55 h-8 bg-slate-600 animate-pulse rounded-full"></div>
                    </div>
                </div>
                <div className="bg-slate-600 animate-pulse rounded-full w-80 h-6"></div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex justify-center p-5 h-full text-2xl">
                <p>Erro ao encontrar usuário! Tente novamente mais tarde.</p>
            </div>
        );
    }

    const buttons = {
        friend: (
            <LinkButton
                to={"/amigos/" + user.username}
                text="Ir Para Conversa"
            />
        ),
        user: (
            <Button
                onClick={() =>
                    mutation.mutate({ receiverId: user.id, token: token! })
                }
                text="Adicionar Amigo"
            />
        ),
        you: <LinkButton to={"/"} text="Configurações" />,
    };
    const activeButton = user.isYou
        ? buttons.you
        : user.isFriend
          ? buttons.friend
          : buttons.user;

    return (
        <div className="flex flex-col w-[80%] mx-auto p-10 gap-4 h-full text-lg">
            <figure className="flex flex-col items-center">
                <ProfilePicture
                    imgURL={user.profilePicture?.url || null}
                    size="24x24"
                />
                <figcaption className="text-4xl">{user.username}</figcaption>
            </figure>
            <p>Usuário criado em {new Date(user.createdAt).toLocaleString()}</p>
            <div className="flex justify-end">{activeButton}</div>
        </div>
    );
}
