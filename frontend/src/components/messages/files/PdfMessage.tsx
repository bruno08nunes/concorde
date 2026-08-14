import type { MouseEvent } from "react";
import { downloadPdf } from "../../../api/files";
import type { ChatFile } from "../../../types/files";

export default function PdfMessage({ file }: { file: ChatFile }) {
    async function handleDownloadPdf(e: MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();

        const blob = await downloadPdf(file!.url);
        const blobObject = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobObject;
        a.download = file?.filename ?? "";

        document.body.appendChild(a);
        a.click();

        a.remove();
        URL.revokeObjectURL(blobObject);
    }

    return (
        <div className="bg-[#00000033] p-2 flex flex-col gap-2">
            <span>{file.filename}</span>
            <a
                href={"#"}
                className="bg-[#00000055] text-center cursor-pointer hover:bg-[#00000033] p-1"
                onClick={handleDownloadPdf}
            >
                Baixar PDF
            </a>
        </div>
    );
}
