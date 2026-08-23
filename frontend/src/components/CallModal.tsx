import { useWebRTCContext } from "../contexts/WebRTCContext";

export default function CallModal() {
    const {
        callStatus,
        acceptCall,
        rejectCall,
        endCall,
        localStream,
        remoteStream,
    } = useWebRTCContext();

    return (
        <div
            className={
                "fixed inset-0 bg-[#00000088]" +
                (callStatus === "idle" ? " hidden" : "")
            }
        >
            {callStatus === "receiving" && (
                <>
                    <h2>Chamada recebida</h2>

                    <button onClick={acceptCall}>Aceitar</button>

                    <button onClick={rejectCall}>Recusar</button>
                </>
            )}

            {callStatus === "calling" && <h2>Ligando...</h2>}

            {callStatus === "connected" && (
                <>
                    <video
                        ref={(video) => {
                            if (video) {
                                video.srcObject = localStream;
                            }
                        }}
                        autoPlay
                        playsInline
                    />

                    <video
                        ref={(video) => {
                            if (video) {
                                video.srcObject = remoteStream;
                            }
                        }}
                        autoPlay
                        muted
                        playsInline
                    />

                    <button onClick={endCall}>Encerrar</button>
                </>
            )}
        </div>
    );
}
