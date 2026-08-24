import { useRef, useState } from "react";
import {
    emitAnswer,
    emitIceCandidate,
    emitMute,
    emitOffer,
    endCallSocket,
    rejectCallSocket,
} from "../lib/socket";
import { useSocketEvent } from "./useSocketEvent";

type CallStatus = "idle" | "calling" | "receiving" | "connected";

interface IncomingCall {
    callerId: number;
    offer: RTCSessionDescriptionInit;
    isVideoCall?: boolean;
    callerName?: string;
    callerPicture?: { url: string } | null;
}

export function useWebRTC() {
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const remoteStreamRef = useRef<MediaStream | null>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

    const [callStatus, setCallStatus] = useState<CallStatus>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [isRemoteMuted, setIsRemoteMuted] = useState(false);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);
    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
    const [calledUser, setCalledUser] = useState<{
        username: string;
        profilePictureUrl: string | undefined;
    } | null>(null);
    const [otherUserId, setOtherUserId] = useState<number | null>(null);
    const [otherUserData, setOtherUserData] = useState<{
        username: string;
        profilePictureUrl?: string;
    } | null>(null);

    const callStatusRef = useRef<CallStatus>("idle");

    function changeCallStatus(status: CallStatus) {
        callStatusRef.current = status;
        setCallStatus(status);
    }

    async function createPeerConnection(userId: number) {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        });

        peerConnection.onicecandidate = (event) => {
            if (!event.candidate) {
                return;
            }

            emitIceCandidate({
                receiverId: userId,
                candidate: event.candidate,
            });
        };

        peerConnection.ontrack = (event) => {
            const [stream] = event.streams;

            if (!stream) {
                return;
            }

            remoteStreamRef.current = stream;
            setRemoteStream(stream);
        };

        peerConnection.onconnectionstatechange = () => {
            if (peerConnection.connectionState === "connected") {
                changeCallStatus("connected");
            }

            if (
                peerConnection.connectionState === "failed" ||
                peerConnection.connectionState === "disconnected" ||
                peerConnection.connectionState === "closed"
            ) {
                changeCallStatus("idle");
            }
        };

        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStreamRef.current!);
            });
        }

        peerConnectionRef.current = peerConnection;

        return peerConnection;
    }

    async function createLocalStream(hasVideo: boolean) {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: hasVideo,
        });

        localStreamRef.current = stream;
        setLocalStream(stream);
        setIsMuted(false);
        setIsCameraEnabled(hasVideo);

        return stream;
    }

    async function startLocalStream(hasVideo: boolean) {
        if (localStreamRef.current) {
            return localStreamRef.current;
        }

        return createLocalStream(hasVideo);
    }

    async function renegotiate() {
        const peerConnection = peerConnectionRef.current;

        if (!peerConnection || !otherUserId) {
            return;
        }

        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        emitOffer({
            receiverId: otherUserId,
            offer,
        });
    }

    async function startCall(userId: number, hasVideo: boolean) {
        setOtherUserId(userId);
        changeCallStatus("calling");

        await startLocalStream(hasVideo);

        const peerConnection = await createPeerConnection(userId);

        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        emitOffer({
            receiverId: userId,
            offer,
            isVideoCall: hasVideo,
        });
    }

    async function acceptCall() {
        if (!incomingCall) {
            return;
        }

        const { callerId, offer, callerName, callerPicture } = incomingCall;

        setOtherUserId(callerId);
        setOtherUserData({
            username: callerName || "",
            profilePictureUrl: callerPicture?.url,
        });
        setIncomingCall(null);

        await startLocalStream(incomingCall.isVideoCall ?? false);

        const peerConnection = await createPeerConnection(callerId);

        await peerConnection.setRemoteDescription(offer);

        for (const candidate of pendingCandidatesRef.current) {
            await peerConnection.addIceCandidate(candidate);
        }

        pendingCandidatesRef.current = [];

        const answer = await peerConnection.createAnswer();

        await peerConnection.setLocalDescription(answer);

        emitAnswer({
            receiverId: callerId,
            answer,
        });
    }

    async function rejectCall() {
        if (!incomingCall) {
            return;
        }

        rejectCallSocket({
            receiverId: incomingCall.callerId,
        });

        setIncomingCall(null);
        changeCallStatus("idle");
    }

    async function toggleMicrophone() {
        const stream = localStreamRef.current;

        if (!stream) {
            return;
        }

        const audioTracks = stream.getAudioTracks();

        audioTracks.forEach((track) => {
            track.enabled = !track.enabled;
        });

        const muted = audioTracks.some((track) => !track.enabled);
        setIsMuted(muted);

        emitMute({ muted, receiverId: otherUserId! });
    }

    async function toggleCamera() {
        const stream = localStreamRef.current;
        const peerConnection = peerConnectionRef.current;

        if (!stream || !peerConnection) {
            return;
        }

        const videoTracks = stream.getVideoTracks();

        if (videoTracks.length === 0) {
            const cameraStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            const videoTrack = cameraStream.getVideoTracks()[0];

            if (!videoTrack) {
                return;
            }

            stream.addTrack(videoTrack);

            peerConnection.addTrack(videoTrack, stream);

            setLocalStream(stream);
            setIsCameraEnabled(true);

            await renegotiate();

            return;
        }

        videoTracks.forEach((track) => {
            track.enabled = !track.enabled;
        });

        setIsCameraEnabled(videoTracks.some((track) => track.enabled));
    }

    async function endCall() {
        if (otherUserId) {
            endCallSocket({
                receiverId: otherUserId,
            });
        }

        peerConnectionRef.current?.close();
        peerConnectionRef.current = null;

        pendingCandidatesRef.current = [];

        localStreamRef.current?.getTracks().forEach((track) => track.stop());
        remoteStreamRef.current?.getTracks().forEach((track) => track.stop());

        localStreamRef.current = null;
        remoteStreamRef.current = null;

        setLocalStream(null);
        setRemoteStream(null);
        setOtherUserId(null);
        changeCallStatus("idle");
        setIncomingCall(null);
        setIsMuted(false);
        setIsCameraEnabled(false);
    }

    useSocketEvent(
        "call:offer",
        async ({
            callerId,
            offer,
            isVideoCall,
            callerName,
            callerPicture,
        }: IncomingCall) => {
            const peerConnection = peerConnectionRef.current;

            if (peerConnection && callStatusRef.current === "connected") {
                await peerConnection.setRemoteDescription(offer);

                const answer = await peerConnection.createAnswer();

                await peerConnection.setLocalDescription(answer);

                emitAnswer({
                    receiverId: callerId,
                    answer,
                });

                return;
            }

            setIncomingCall({
                callerId,
                offer,
                isVideoCall,
                callerName,
                callerPicture,
            });

            changeCallStatus("receiving");
        },
    );

    useSocketEvent(
        "call:answer",
        async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
            const peerConnection = peerConnectionRef.current;

            if (!peerConnection) {
                return;
            }

            await peerConnection.setRemoteDescription(answer);

            for (const candidate of pendingCandidatesRef.current) {
                await peerConnection.addIceCandidate(candidate);
            }

            pendingCandidatesRef.current = [];

            changeCallStatus("connected");
        },
    );

    useSocketEvent(
        "call:ice-candidate",
        async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
            const peerConnection = peerConnectionRef.current;

            if (!peerConnection) {
                return;
            }

            if (peerConnection.remoteDescription) {
                await peerConnection.addIceCandidate(candidate);
            } else {
                pendingCandidatesRef.current.push(candidate);
            }
        },
    );

    useSocketEvent("call:reject", () => {
        endCall();
    });

    useSocketEvent("call:end", () => {
        endCall();
    });

    useSocketEvent("call:mute", ({ muted }: { muted: boolean }) => {
        setIsRemoteMuted(muted);
    });

    return {
        localStreamRef,
        remoteStreamRef,

        localStream,
        remoteStream,

        callStatus,
        incomingCall,
        calledUser,
        setCalledUser,
        otherUserData,
        setOtherUserData,

        isMuted,
        isRemoteMuted,
        isCameraEnabled,

        startCall,
        acceptCall,
        rejectCall,

        toggleMicrophone,
        toggleCamera,

        endCall,
    };
}
