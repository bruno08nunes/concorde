import { ObjectId } from "mongodb";

export interface MessageDocument {
    _id?: ObjectId;

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
