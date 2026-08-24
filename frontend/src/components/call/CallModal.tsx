import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { useWebRTCContext } from "../../contexts/WebRTCContext";
import CallVideo from "./CallVideo";
import CallButton from "./CallButton";
import ReceivingCall from "./ReceivingCall";
import Calling from "./Calling";
import { useAuthStore } from "../../stores/authStore";

export default function CallModal() {
    const {
        callStatus,
        endCall,
        localStream,
        remoteStream,

        otherUserData,

        isMuted,
        isRemoteMuted,
        toggleMicrophone,

        isCameraEnabled,
        isRemoteCameraEnabled,
        toggleCamera,
    } = useWebRTCContext();

    const { user: userData } = useAuthStore();

    return (
        <div
            className={
                "fixed inset-0 bg-[#00000088] z-10" +
                (callStatus === "idle" ? " hidden" : "")
            }
        >
            {callStatus === "receiving" && <ReceivingCall />}

            {callStatus === "calling" && <Calling />}

            {callStatus === "connected" && (
                <div className="flex flex-col h-full justify-center gap-5">
                    <div className="flex justify-center gap-4">
                        <CallVideo
                            stream={remoteStream}
                            muted={isRemoteMuted}
                            user={{ username: otherUserData?.username ?? "" }}
                            isCameraEnabled={isRemoteCameraEnabled}
                        />
                        <CallVideo
                            stream={localStream}
                            muted={isMuted}
                            isLocal
                            user={{ username: userData?.username ?? "Você" }}
                            isCameraEnabled={isCameraEnabled}
                        />
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
