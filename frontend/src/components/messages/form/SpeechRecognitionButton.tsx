import { AudioLines } from "lucide-react";
import IconButton from "../../IconButton";
import { toast } from "sonner";
import { useRef, useState } from "react";

export default function SpeechRecognitionButton({
    onRecord,
}: {
    onRecord: (string: string) => void;
}) {
    const [isRecording, setIsRecording] = useState(false);

    const recognitionRef = useRef<SpeechRecognition | null>(null);

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
            const transcript = Array.from(e.results).reduce(
                (text, result) => {
                    return text.concat(result[0].transcript);
                },
                "",
            );

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
