import { MicOff } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CallVideo({
    stream,
    muted,
    isCameraEnabled,
    isLocal,
    user,
}: {
    stream: MediaStream | null;
    muted?: boolean;
    isCameraEnabled?: boolean;
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
            {!isCameraEnabled && (
                <div className="flex items-center justify-center absolute inset-0 bg-slate-700">
                    <img
                        src={
                            user?.profilePictureUrl ??
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                        }
                        className="max-w-[40%] rounded-full aspect-square object-cover"
                    />
                </div>
            )}
            <div className="flex gap-2 items-center absolute bottom-1 left-1 text-xl bg-[#00000088] p-1 px-3 rounded-full">
                {muted && <MicOff size={20} />}
                <span>{user?.username}</span>
            </div>
        </div>
    );
}
