import { Phone, PhoneOff } from "lucide-react";
import CallButton from "./CallButton";
import { useWebRTCContext } from "../../contexts/WebRTCContext";

export default function ReceivingCall() {
    const {
        acceptCall,
        rejectCall,

        incomingCall,
    } = useWebRTCContext();

    return (
        <div className="flex flex-col h-full justify-center items-center gap-3 text-2xl ">
            <img
                src={
                    incomingCall?.callerPicture?.url ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                }
                className="rounded-full object-cover aspect-square size-50"
                alt=""
            />
            <span>
                {incomingCall?.callerName
                    ? `${incomingCall.callerName} está te ligando`
                    : "Você está recebendo uma ligação"}
                {incomingCall?.isVideoCall ? " por vídeo" : ""}.
            </span>
            <div className="bg-slate-700 rounded-2xl p-2 flex gap-4">
                <CallButton onClick={rejectCall}>
                    <PhoneOff />
                </CallButton>
                <CallButton onClick={acceptCall} isActive>
                    <Phone />
                </CallButton>
            </div>
        </div>
    );
}
