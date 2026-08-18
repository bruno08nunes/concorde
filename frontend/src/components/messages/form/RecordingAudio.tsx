import { Mic } from "lucide-react";
import { useEffect, useState } from "react";

export default function RecordingAudio({
    isRecording,
}: {
    isRecording: boolean;
}) {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;

    useEffect(() => {
        const timerId = setInterval(() => {
            if (!isRecording) {
                return;
            }

            setTotalSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    });

    return (
        <div className="flex-1 flex gap-4 items-center">
            <div className="p-1 bg-indigo-600 rounded-full">
                <Mic className="animate-pulse text-white" />
            </div>
            <div>
                {hours > 0 && <span>{hours}:</span>}
                <span>{minutes.toString().padStart(2, "0")}:</span>
                <span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <div className="flex flex-1 items-center pr-5">
                <hr className="flex-1 border-indigo-600 border-2" />
                <span className="bg-indigo-600 size-3 rounded-full"></span>
            </div>
        </div>
    );
}
