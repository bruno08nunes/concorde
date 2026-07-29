import { Check, X } from "lucide-react";
import Notification from "../components/notification/NotificationItem";
import { useQuery } from "@tanstack/react-query";
import { listPendingFriendshipRequests } from "../api/friendships";
import { useAuthStore } from "../stores/authStore";
import ProfilePicture from "../components/ProfilePicture";

export default function NotificationPage() {
    const { token } = useAuthStore();

    const { data, error, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => listPendingFriendshipRequests({ token: token! }),
    });

    if (isLoading) {
        return "Carregando...";
    }

    if (error) {
        return <p>Erro ao exibir notificações!</p>;
    }

    return (
        <>
            <section className="flex flex-col gap-4 p-3">
                <h1 className="text-2xl">Notificações</h1>
                <hr />
                {data?.map((friendshipRequest) => (
                    <Notification.Root key={friendshipRequest.id}>
                        <div className="flex items-center gap-4 p-1 rounded-2xl">
                            <ProfilePicture
                                imgURL={
                                    friendshipRequest.sender.profilePicture
                                        ?.url || null
                                }
                            />
                            <span className="text-justify">
                                {friendshipRequest.sender.username} enviou um
                                pedido de amizade.
                            </span>
                        </div>
                        <Notification.Buttons>
                            <button className="border p-1 cursor-pointer rounded-lg hover:outline-1">
                                <X />
                            </button>
                            <button className="border p-1 cursor-pointer rounded-lg hover:outline-1">
                                <Check />
                            </button>
                        </Notification.Buttons>
                    </Notification.Root>
                ))}
            </section>
        </>
    );
}
