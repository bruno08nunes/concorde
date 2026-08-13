import { IFileRepository } from "../repositories/file-repository";
import { IMessageRepository } from "../repositories/message-repository";
import MongoMessageRepository from "../repositories/mongo/mongo-message-repository";
import { PrismaFileRepository } from "../repositories/prisma/prisma-file-repository";
import orderIds from "../utils/order-ids";

export class MessageService {
    constructor(
        private messagesRepository: IMessageRepository,
        private fileRepository: IFileRepository,
    ) {}

    createMessage(data: {
        content: string | null;
        type: "private" | "group";
        attachments: { fileId: number }[];
        receiverId: number;
        senderId: number;
        conversationId: string;
    }) {
        const message = {
            ...data,
            receiverId: undefined,
            createdAt: new Date(),
        };

        return this.messagesRepository.create(message);
    }

    async listMessages(
        receiverId: number,
        senderId: number,
        limit: number,
        before?: string,
    ) {
        const [firstId, secondId] = orderIds(receiverId, senderId);
        const conversationId = `${firstId}_${secondId}`;

        const messages = await this.messagesRepository.getConversationMessages(
            conversationId,
            limit,
            before,
        );

        const filesIds = messages.flatMap((message) =>
            message.attachments.map((file) => file.fileId),
        );
        const files = await this.fileRepository.getFilesByIds(filesIds);
        const filesMap = new Map(files.map((file) => [file.id, file]));

        const messagesWithFiles = messages.map((message) => ({
            ...message,
            attachments: message.attachments.map((attachment) => ({
                ...attachment,
                file: filesMap.get(attachment.fileId),
            })),
        }));

        return messagesWithFiles;
    }
}

const messageService = new MessageService(
    new MongoMessageRepository(),
    new PrismaFileRepository(),
);
export default messageService;
