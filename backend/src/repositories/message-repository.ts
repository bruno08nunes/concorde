export interface IMessageRepository {
    create(data: any): Promise<any>;
    getConversationMessages(conversationId: string): Promise<any>;
}
