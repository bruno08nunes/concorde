import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendshipRequest } from "../../api/friendships";
import { toast } from "sonner";
import { Check } from "lucide-react";

export default function AcceptButton({
    token,
    friendshipRequestId,
}: {
    token: string;
    friendshipRequestId: number;
}) {
    const queryClient = useQueryClient();

    const { mutate: acceptMutate } = useMutation({
        mutationFn: () =>
            acceptFriendshipRequest({ token: token!, requestId: friendshipRequestId }),
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

    return (
        <button
            className="border p-1 cursor-pointer rounded-lg hover:outline-1"
            onClick={() => acceptMutate()}
        >
            <Check />
        </button>
    );
}
