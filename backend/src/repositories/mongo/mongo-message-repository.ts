import { ObjectId } from "mongodb";
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

    async getConversationMessages(
        conversationId: string,
        limit: number,
        before?: string,
    ) {
        const filter: {
            conversationId: string;
            _id?: { $lt: ObjectId };
        } = { conversationId };

        if (before) {
            filter._id = {
                $lt: new ObjectId(before),
            };
        }

        const messages = await this.collection
            .find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .toArray();
        
        return messages.reverse();
    }
}
