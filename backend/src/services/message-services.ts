import { IMessageRepository } from "../repositories/message-repository";
import MongoMessageRepository from "../repositories/mongo/mongo-message-repository";

export class MessageService {
    constructor(private messagesRepository: IMessageRepository) {}

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
}

const messageService = new MessageService(new MongoMessageRepository());
export default messageService;
