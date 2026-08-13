import type { ChatFile } from "./files";

export interface SendMessage {
    _id: string;
    conversationId: string;
    senderId: number;
    content: string | null;
    type: "private" | "group";
    attachments: {
        fileId: number;
        file: ChatFile
    }[];
    createdAt: string;
    editedAt?: string | null;
    deletedAt?: string | null;
}
