import { Mic, MicOff, Phone, PhoneOff, Video, VideoOff } from "lucide-react";
import { useWebRTCContext } from "../../contexts/WebRTCContext";
import CallVideo from "./CallVideo";
import CallButton from "./CallButton";

export default function CallModal() {
    const {
        callStatus,
        acceptCall,
        rejectCall,
        endCall,
        localStream,
        remoteStream,

        calledUser,
        incomingCall,

        isMuted,
        toggleMicrophone,

        isCameraEnabled,
        toggleCamera,
    } = useWebRTCContext();

    return (
        <div
            className={
                "fixed inset-0 bg-[#00000088] z-10" +
                (callStatus === "idle" ? " hidden" : "")
            }
        >
            {callStatus === "receiving" && (
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
            )}

            {callStatus === "calling" && (
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
            )}

            {callStatus === "connected" && (
                <div className="flex flex-col h-full justify-center gap-5">
                    <div className="flex justify-center gap-4">
                        <CallVideo stream={localStream} isLocal />
                        <CallVideo stream={remoteStream} />
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-slate-700 rounded-2xl p-2 flex gap-4">
                            <CallButton
                                onClick={toggleMicrophone}
                                activeElement={<Mic />}
                                inactiveElement={<MicOff />}
                                isActive={!isMuted}
                            />
                            <span className="border"></span>
                            <CallButton
                                onClick={toggleCamera}
                                activeElement={<Video />}
                                inactiveElement={<VideoOff />}
                                isActive={isCameraEnabled}
                            />
                            <span className="border"></span>
                            <CallButton onClick={endCall}>
                                <PhoneOff />
                            </CallButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
