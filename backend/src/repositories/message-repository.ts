import { MessageDocument } from "./mongo/types/message-document";

export interface IMessageRepository {
    create(data: MessageDocument): Promise<MessageDocument>;
    getConversationMessages(conversationId: string, limit: number, before?: string): Promise<MessageDocument[]>;
}
