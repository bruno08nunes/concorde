export interface SendMessage {
    _id: string;

    conversationId: string;

    senderId: number;

    content: string | null;

    type: "private" | "group";

    attachments: {
        fileId: number; // ID da tabela File do PostgreSQL
    }[];

    createdAt: Date;

    editedAt?: Date | null;

    deletedAt?: Date | null;
}
