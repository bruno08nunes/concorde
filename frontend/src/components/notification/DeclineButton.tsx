import { X } from "lucide-react";
import Notification from "./NotificationItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineFriendshipRequest } from "../../api/friendships";
import { toast } from "sonner";

export default function DeclineButton({
    token,
    friendshipRequestId,
}: {
    token: string;
    friendshipRequestId: number;
}) {
    const queryClient = useQueryClient();

    const { mutate: declineMutate } = useMutation({
        mutationFn: () =>
            declineFriendshipRequest({ token: token!, requestId: friendshipRequestId }),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
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

    return (
        <Notification.Button onClick={() => declineMutate()}>
            <X />
        </Notification.Button>
    );
}
