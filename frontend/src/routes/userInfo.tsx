import { useParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { getUserByUsername } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import ProfilePicture from "../components/ProfilePicture";
import LinkButton from "../components/LinkButton";
import Button from "../components/form/Button";

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

    if (isLoading) {
        // TODO: Arrumar
    }

    if (error || !user) {
        // TODO: Arrumar
        return;
    }

    return (
        <div className="flex flex-col w-[80%] mx-auto p-10 gap-4 h-full text-lg">
            <figure className="flex flex-col items-center">
                <ProfilePicture imgURL={user.profilePicture?.url || null} size="24x24" />
                <figcaption className="text-4xl">{user.username}</figcaption>
            </figure>
            <p>Usuário criado em {new Date(user.createdAt).toLocaleString()}</p>
            <div className="flex justify-end">
                {user.isFriend ? (
                    <LinkButton
                        to={"/amigos/" + user.username}
                        text="Ir Para Conversa"
                    />
                ) : (
                    <Button onClick={() => {}} text="Adicionar Amigo" />
                )}
            </div>
        </div>
    );
}
