import { AudioLines } from "lucide-react";
import IconButton from "../../IconButton";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionButtonProps {
    onRecord: (text: string) => void;
    isRecording?: boolean;
    onRecordingChange?: (isRecording: boolean) => void;
}

export default function SpeechRecognitionButton({
    onRecord,
    isRecording: controlledIsRecording,
    onRecordingChange,
}: SpeechRecognitionButtonProps) {
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

    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (!isRecording) {
            recognitionRef.current?.stop();
            recognitionRef.current = null;
        }
    }, [isRecording]);

    function handleStartRecording() {
        const isSpeechRecognitionAPIAvailable =
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window;

        if (!isSpeechRecognitionAPIAvailable) {
            toast("Não é possível iniciar a gravação no seu dispositivo!");
            return;
        }

        const SpeechRecognitionAPI =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        setIsRecording(true);

        const recognition = new SpeechRecognitionAPI();

        recognition.lang = "pt-BR";
        recognition.continuous = true;
        recognition.maxAlternatives = 1;
        recognition.interimResults = true;

        recognition.onresult = (e) => {
            const transcript = Array.from(e.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, "");

            onRecord(transcript);
        };

        recognition.onerror = (e) => {
            console.log(e);
        };

        recognition.start();

        recognitionRef.current = recognition;
    }

    function handleStopRecording() {
        setIsRecording(false);
        recognitionRef.current?.stop();
    }

    return (
        <IconButton
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            isActive={isRecording}
        >
            <AudioLines />
        </IconButton>
    );
}
