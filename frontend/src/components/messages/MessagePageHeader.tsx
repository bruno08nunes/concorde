import { LucideUserPlus2 } from "lucide-react";
import IconButton from "../IconButton";
import UserOnlineIcon from "../UserOnlineIcon";
import StartCallButtons from "./StartCallButtons";
import ProfilePicture from "../ProfilePicture";

interface MessagePageHeaderProps {
    username: string;
    profilePictureUrl?: string;
    isOnline?: boolean;
    conversationId?: number;
}

export default function MessagePageHeader({
    username,
    profilePictureUrl,
    isOnline,
    conversationId
}: MessagePageHeaderProps) {
    return (
        <header className="flex items-center p-3 justify-between">
            <span className="flex items-center gap-4">
                <div className="relative">
                    <ProfilePicture imgURL={profilePictureUrl ?? null} />
                    <UserOnlineIcon isOnline={isOnline} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl flex-1">{username}</span>
                    <span className="text-xs text-gray-300">
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>
            </span>
            <div className="flex gap-3">
                <StartCallButtons conversationId={conversationId!} user={{username, profilePictureUrl}} />
                <IconButton>
                    <LucideUserPlus2 />
                </IconButton>
            </div>
        </header>
    );
}
