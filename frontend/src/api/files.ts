import type { ChatFile } from "../types/files";

export async function uploadFiles(formData: FormData) {
    const res = await fetch("http://localhost:3333/files", {
        method: "POST",
        body: formData,
    });
    const result: { data: ChatFile[]; success: boolean; message: string } =
        await res.json();

    return result.data.map((file) => ({ fileId: file.id }));
}

export async function downloadPdf(pdfName: string) {
    const res = await fetch("http://localhost:3333/uploads/" + pdfName);
    const blob = await res.blob();
    return blob;
}