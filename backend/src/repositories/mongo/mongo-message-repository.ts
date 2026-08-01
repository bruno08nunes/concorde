import { mongo } from "../../lib/mongo";
import { IMessageRepository } from "../message-repository";
import { MessageDocument } from "./types/message-document";

export default class MongoMessageRepository implements IMessageRepository {
    private collection = mongo.collection<MessageDocument>("messages");

    async create(data: MessageDocument) {
        const result = await this.collection.insertOne(data);

        return {
            _id: result.insertedId,
            ...data,
        };
    }

    async getConversationMessages(conversationId: string) {
        return await this.collection
            .find({ conversationId })
            .sort({ createdAt: 1 })
            .toArray();
    }
}
