import { ChevronRight, Mic, PlayCircle, StopCircle, Trash2 } from "lucide-react";
import IconButton from "../../IconButton";
import { useRef, useState } from "react";
import type { AudioStatus } from "../../../types/files";

interface RecordAudioButtonProps {
    onRecord: (audio: Blob) => void;
    recordingStatus?: AudioStatus;
    onRecordingChange?: (recordingStatus: AudioStatus) => void;
    hasPauseAudioButton?: boolean;
    hasDeleteAudioButton?: boolean;
}

export default function RecordAudioButton({
    onRecord,
    recordingStatus: controlledRecordingStatus,
    onRecordingChange,
    hasDeleteAudioButton = true,
    hasPauseAudioButton: hasStopAudioButton = true,
}: RecordAudioButtonProps) {
    const [internalRecordingStatus, setInternalRecordingStatus] =
        useState<AudioStatus>("stopped");

    const isControlled = controlledRecordingStatus !== undefined;

    const recordingStatus = isControlled
        ? controlledRecordingStatus
        : internalRecordingStatus;

    function setRecordingStatus(value: AudioStatus) {
        if (!isControlled) {
            setInternalRecordingStatus(value);
        }

        onRecordingChange?.(value);
    }

    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const mediaStreamRef = useRef<MediaStream>(null);
    const chunkRef = useRef<Blob[]>([]);
    const shouldDeleteRecordingRef = useRef(false);

    async function handleStartRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        mediaStreamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        chunkRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunkRef.current.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            if (shouldDeleteRecordingRef.current) {
                chunkRef.current = [];
                shouldDeleteRecordingRef.current = false;
                return;
            }

            if (chunkRef.current.length === 0) {
                return;
            }

            const audioBlob = new Blob(chunkRef.current, {
                type: mediaRecorder.mimeType,
            });

            onRecord(audioBlob);
        };

        mediaRecorder.start();

        mediaRecorderRef.current = mediaRecorder;
        setRecordingStatus("recording");
    }

    function handleStopRecording() {
        mediaRecorderRef.current?.stop();

        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());

        mediaRecorderRef.current = null;
        mediaStreamRef.current = null;

        setRecordingStatus("stopped");
    }

    function handleDeleteRecording() {
        shouldDeleteRecordingRef.current = true;
        handleStopRecording();
    }

    function handlePauseRecording() {
        setRecordingStatus("paused");
        mediaRecorderRef.current?.pause();
    }

    function handleResumeRecording() {
        setRecordingStatus("recording");
        mediaRecorderRef.current?.resume();
    }

    const showDeleteAudioButton =
        ["paused", "recording"].includes(recordingStatus) &&
        hasDeleteAudioButton;
    const showStopAudioButton =
        ["recording"].includes(recordingStatus) && hasStopAudioButton;
    const showResumeAudioButton =
        ["paused"].includes(recordingStatus) && hasStopAudioButton;

    return (
        <>
            {showDeleteAudioButton && (
                <IconButton onClick={handleDeleteRecording}>
                    <Trash2 />
                </IconButton>
            )}
            {showStopAudioButton && (
                <IconButton onClick={handlePauseRecording}>
                    <StopCircle />
                </IconButton>
            )}
            {showResumeAudioButton && (
                <IconButton onClick={handleResumeRecording}>
                    <PlayCircle />
                </IconButton>
            )}
            {recordingStatus !== "stopped" ? (
                <IconButton onClick={handleStopRecording}>
                    <ChevronRight />
                </IconButton>
            ) : (
                <IconButton onClick={handleStartRecording}>
                    <Mic />
                </IconButton>
            )}
        </>
    );
}
