export interface SendMessage {
    _id: string;

    conversationId: string;

    senderId: number;

    content: string | null;

    type: "private" | "group";

    attachments: {
        fileId: number; // ID da tabela File do PostgreSQL
    }[];

    createdAt: string;

    editedAt?: string | null;

    deletedAt?: string | null;
}
