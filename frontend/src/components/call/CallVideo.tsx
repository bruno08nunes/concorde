import { useEffect, useRef } from "react";

export default function CallVideo({ stream, isLocal }: { stream: MediaStream | null, isLocal?: boolean }) {
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
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocal}
            className="max-w-100"
        />
    );
}
