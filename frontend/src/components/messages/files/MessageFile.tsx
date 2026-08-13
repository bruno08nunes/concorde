import type { ChatFile } from "../../../types/files";

export default function MessageFile({ file }: { file?: ChatFile }) {
    if (!file) {
        return;
    }

    if (file.type === "IMAGE") {
        return (
            <img
                src={"http://localhost:3333/uploads/" + file.url}
                className="max-w-full rounded-md"
            />
        );
    }

    return "Arquivo inválido";
}
