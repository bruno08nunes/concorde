import { env } from "../lib/env";
import type { ChatFile } from "../types/files";

export async function uploadFiles(formData: FormData) {
    const res = await fetch(`${env.VITE_API_URL}/files`, {
        method: "POST",
        body: formData,
    });
    const result: { data: ChatFile[]; success: boolean; message: string } =
        await res.json();

    return result.data.map((file) => ({ fileId: file.id }));
}

export async function downloadPdf(pdfName: string) {
    const res = await fetch(`${env.VITE_API_URL}/uploads/${pdfName}`);
    const blob = await res.blob();
    return blob;
}