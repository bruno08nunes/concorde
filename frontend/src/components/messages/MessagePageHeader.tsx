import { LucideUserPlus2, PhoneCall, Video } from "lucide-react";
import IconButton from "../IconButton";

export default function MessagePageHeader({
    username,
    profilePictureUrl,
}: {
    username: string;
    profilePictureUrl?: string;
}) {
    return (
        <header className="flex items-center p-3 justify-between">
            <span className="flex items-center gap-4">
                <img
                    src={profilePictureUrl ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"}
                    alt=""
                    className="w-12 rounded-full object-cover aspect-square"
                />
                <span className="text-xl flex-1">{username}</span>
            </span>
            <div className="flex gap-3">
                <IconButton>
                    <PhoneCall />
                </IconButton>
                <IconButton>
                    <Video />
                </IconButton>
                <IconButton>
                    <LucideUserPlus2 />
                </IconButton>
            </div>
        </header>
    );
}
