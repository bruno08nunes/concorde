import { Check, X } from "lucide-react";
import Notification from "../components/notification/NotificationItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    acceptFriendshipRequest,
    listPendingFriendshipRequests,
} from "../api/friendships";
import { useAuthStore } from "../stores/authStore";
import ProfilePicture from "../components/ProfilePicture";
import { toast } from "sonner";

export default function NotificationPage() {
    const { token } = useAuthStore();

    const { data, error, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => listPendingFriendshipRequests({ token: token! }),
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (requestId: number) =>
            acceptFriendshipRequest({ token: token!, requestId }),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["friends"] });
        },
        onError(err) {
            toast(err.message, {
                style: {
                    color: "red",
                },
                position: "top-center",
            });
        },
    });

    if (isLoading) {
        return (
            <section className="flex flex-col gap-4 p-3">
                <h1 className="text-2xl">Notificações</h1>
                <hr />
                <div className="flex items-center justify-between border p-2 rounded-2xl gap-6">
                    <div className="flex-1 flex flex-col gap-3 overflow-auto">
                        <div className="flex gap-4 p-1">
                            <div className="w-12 rounded-full object-cover aspect-square bg-slate-600 animate-pulse" />
                            <div className="bg-slate-600 animate-pulse flex-1 rounded-full m-3 ml-0"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <p className="p-3 text-xl text-center">
                Erro ao exibir notificações!
            </p>
        );
    }

    return (
        <>
            <section className="flex flex-col gap-4 p-3">
                <h1 className="text-2xl">Notificações</h1>
                <hr />
                {data?.length === 0 && <p>Você não tem notificações!</p>}
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
                            <button
                                className="border p-1 cursor-pointer rounded-lg hover:outline-1"
                                onClick={() => mutate(friendshipRequest.id)}
                            >
                                <Check />
                            </button>
                            <button className="border p-1 cursor-pointer rounded-lg hover:outline-1">
                                <X />
                            </button>
                        </Notification.Buttons>
                    </Notification.Root>
                ))}
            </section>
        </>
    );
}
