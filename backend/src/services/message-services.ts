import { IMessageRepository } from "../repositories/message-repository";
import MongoMessageRepository from "../repositories/mongo/mongo-message-repository";
import orderIds from "../utils/order-ids";

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

    listMessages(
        receiverId: number,
        senderId: number,
        limit: number,
        before?: string,
    ) {
        const [firstId, secondId] = orderIds(receiverId, senderId);
        const conversationId = `${firstId}_${secondId}`;

        return this.messagesRepository.getConversationMessages(conversationId, limit, before);
    }
}

const messageService = new MessageService(new MongoMessageRepository());
export default messageService;
