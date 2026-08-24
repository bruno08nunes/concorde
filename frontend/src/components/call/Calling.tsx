import { PhoneOff } from "lucide-react";
import CallButton from "./CallButton";
import { useWebRTCContext } from "../../contexts/WebRTCContext";

export default function Calling() {
    const {
        endCall,

        calledUser,
    } = useWebRTCContext();

    return (
        <div className="flex flex-col h-full justify-center items-center gap-3 text-2xl animate-pulse">
            <span>Chamando...</span>
            <span></span>
            <img
                src={
                    calledUser?.profilePictureUrl ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                }
                className="rounded-full object-cover aspect-square size-50"
                alt=""
            />
            <span>{calledUser?.username}</span>
            <div className="bg-slate-700 rounded-2xl p-2 flex gap-4">
                <CallButton onClick={endCall}>
                    <PhoneOff />
                </CallButton>
            </div>
        </div>
    );
}
