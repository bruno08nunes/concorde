import { env } from "../../../lib/env";
import type { ChatFile } from "../../../types/files";
import PdfMessage from "./PdfMessage";

export default function MessageFile({ file }: { file?: ChatFile }) {
    if (!file) {
        return;
    }

    if (file.type === "IMAGE") {
        return (
            <img
                src={`${env.VITE_API_URL}/uploads/${file.url}`}
                className="max-w-full rounded-md"
            />
        );
    }

    if (file.type === "VIDEO") {
        return (
            <video
                src={`${env.VITE_API_URL}/uploads/${file.url}`}
                controls
                className="max-w-full rounded-md"
            ></video>
        );
    }

    if (file.type === "AUDIO") {
        return <audio src={`${env.VITE_API_URL}/uploads/${file.url}`}></audio>;
    }

    if (file.type === "PDF") {
        return <PdfMessage file={file} />;
    }

    return "Arquivo inválido";
}
