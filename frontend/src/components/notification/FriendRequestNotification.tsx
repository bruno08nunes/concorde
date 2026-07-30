import type { User } from "../../types/users";
import ProfilePicture from "../ProfilePicture";

export default function FriendRequestNotification({
    sender,
}: {
    sender: User;
}) {
    return (
        <div className="flex items-center gap-4 p-1 rounded-2xl">
            <ProfilePicture imgURL={sender.profilePicture?.url || null} />
            <span className="text-justify">
                {sender.username} enviou um pedido de amizade.
            </span>
        </div>
    );
}
