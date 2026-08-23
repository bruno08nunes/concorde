import { useRef, useState } from "react";
import {
    emitAnswer,
    emitIceCandidate,
    emitOffer,
    endCallSocket,
    rejectCallSocket,
} from "../lib/socket";
import { useSocketEvent } from "./useSocketEvent";

type CallStatus = "idle" | "calling" | "receiving" | "connected";

interface IncomingCall {
    callerId: number;
    offer: RTCSessionDescriptionInit;
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
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
    const [otherUserId, setOtherUserId] = useState<number | null>(null);

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
                setCallStatus("connected");
            }

            if (
                peerConnection.connectionState === "failed" ||
                peerConnection.connectionState === "disconnected" ||
                peerConnection.connectionState === "closed"
            ) {
                setCallStatus("idle");
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

    async function startLocalStream() {
        if (localStreamRef.current) {
            return localStreamRef.current;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });

        localStreamRef.current = stream;
        setLocalStream(stream);

        return stream;
    }

    async function startCall(userId: number) {
        setOtherUserId(userId);
        setCallStatus("calling");

        await startLocalStream();

        const peerConnection = await createPeerConnection(userId);

        const offer = await peerConnection.createOffer();

        await peerConnection.setLocalDescription(offer);

        emitOffer({
            receiverId: userId,
            offer,
        });
    }

    async function acceptCall() {
        if (!incomingCall) {
            return;
        }

        const { callerId, offer } = incomingCall;

        setOtherUserId(callerId);
        setIncomingCall(null);

        await startLocalStream();

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

        setCallStatus("connected");
    }

    async function rejectCall() {
        if (!incomingCall) {
            return;
        }

        rejectCallSocket({
            receiverId: incomingCall.callerId,
        });

        setIncomingCall(null);
        setCallStatus("idle");
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

        setIsMuted(audioTracks.some((track) => !track.enabled));
    }

    async function toggleCamera() {
        const stream = localStreamRef.current;

        if (!stream) {
            return;
        }

        const videoTracks = stream.getVideoTracks();

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
        localStreamRef.current = null;

        setOtherUserId(null);
        setCallStatus("idle");
        setIsMuted(false);
        setIsCameraEnabled(true);
    }

    useSocketEvent("call:offer", ({ callerId, offer }: IncomingCall) => {
        setIncomingCall({
            callerId,
            offer,
        });

        setCallStatus("receiving");
    });

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

            setCallStatus("connected");
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

    return {
        localStreamRef,
        remoteStreamRef,

        localStream,
        remoteStream,

        callStatus,
        incomingCall,

        isMuted,
        isCameraEnabled,

        startCall,
        acceptCall,
        rejectCall,

        toggleMicrophone,
        toggleCamera,

        endCall,
    };
}
