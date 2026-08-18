import { Mic, StopCircle, Trash2 } from "lucide-react";
import IconButton from "../../IconButton";
import { useRef, useState } from "react";

interface RecordAudioButtonProps {
    onRecord: (audio: Blob) => void;
    isRecording?: boolean;
    onRecordingChange?: (isRecording: boolean) => void;
    hasPauseAudioButton?: boolean;
    hasDeleteAudioButton?: boolean;
}

export default function RecordAudioButton({
    onRecord,
    isRecording: controlledIsRecording,
    onRecordingChange,
    hasDeleteAudioButton = true,
    hasPauseAudioButton: hasStopAudioButton = true,
}: RecordAudioButtonProps) {
    const [internalIsRecording, setInternalIsRecording] = useState(false);

    const isControlled = controlledIsRecording !== undefined;

    const isRecording = isControlled
        ? controlledIsRecording
        : internalIsRecording;

    function setIsRecording(value: boolean) {
        if (!isControlled) {
            setInternalIsRecording(value);
        }

        onRecordingChange?.(value);
    }

    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const mediaStreamRef = useRef<MediaStream>(null);
    const chunkRef = useRef<Blob[]>([]);

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
            const audioBlob = new Blob(chunkRef.current, {
                type: mediaRecorder.mimeType,
            });

            onRecord(audioBlob);
        };

        mediaRecorder.start();

        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
    }

    function handleStopRecording() {
        mediaRecorderRef.current?.stop();

        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());

        mediaRecorderRef.current = null;
        mediaStreamRef.current = null;

        setIsRecording(false);
    }

    return (
        <>
            {isRecording && hasDeleteAudioButton && (
                <IconButton>
                    <Trash2 />
                </IconButton>
            )}
            {isRecording && hasStopAudioButton && (
                <IconButton>
                    <StopCircle />
                </IconButton>
            )}
            <IconButton
                onClick={
                    isRecording ? handleStopRecording : handleStartRecording
                }
                isActive={isRecording}
            >
                <Mic />
            </IconButton>
        </>
    );
}
