export interface ChatFile {
    id: number;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
    type: "IMAGE" | "VIDEO" | "AUDIO" | "PDF";
    createdAt: Date;
}
