import { MicOff } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CallVideo({
    stream,
    muted,
    isLocal,
    user,
}: {
    stream: MediaStream | null;
    muted?: boolean;
    isLocal?: boolean;
    user: {
        username: string;
        profilePictureUrl?: string;
    } | null;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        video.srcObject = stream;

        return () => {
            video.srcObject = null;
        };
    }, [stream]);

    return (
        <div className="max-w-100 relative">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isLocal || muted}
                className="w-full"
            />
            <div className="flex gap-2 items-center absolute bottom-1 left-1 text-xl bg-[#00000088] p-1 px-3 rounded-full">
                {muted && <MicOff size={20} />}
                <span>{user?.username}</span>
            </div>
        </div>
    );
}
