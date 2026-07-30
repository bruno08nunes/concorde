import Notification from "../components/notification/NotificationItem";
import { useQuery } from "@tanstack/react-query";
import { listPendingFriendshipRequests } from "../api/friendships";
import { useAuthStore } from "../stores/authStore";
import DeclineButton from "../components/notification/DeclineButton";
import AcceptButton from "../components/notification/AcceptButton";
import FriendRequestNotification from "../components/notification/FriendRequestNotification";
import NotificationSkeleton from "../components/notification/NotificationSkeleton";

export default function NotificationPage() {
    const { token } = useAuthStore();

    const { data, error, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => listPendingFriendshipRequests({ token: token! }),
    });

    if (isLoading) {
        return <NotificationSkeleton />;
    }

    if (error) {
        return (
            <p className="p-3 text-xl text-center">
                Erro ao exibir notificações!
            </p>
        );
    }

    return (
        <section className="flex flex-col gap-4 p-3">
            <h1 className="text-2xl">Notificações</h1>
            <hr />
            {data?.length === 0 && <p>Você não tem notificações!</p>}
            {data?.map((friendshipRequest) => (
                <Notification.Root key={friendshipRequest.id}>
                    <FriendRequestNotification
                        sender={friendshipRequest.sender}
                    />
                    <Notification.Buttons>
                        <AcceptButton
                            token={token!}
                            friendshipRequestId={friendshipRequest.id}
                        />
                        <DeclineButton
                            token={token!}
                            friendshipRequestId={friendshipRequest.id}
                        />
                    </Notification.Buttons>
                </Notification.Root>
            ))}
        </section>
    );
}
