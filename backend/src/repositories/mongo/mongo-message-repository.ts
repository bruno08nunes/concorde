import { mongo } from "../../lib/mongo";
import { IMessageRepository } from "../message-repository";

export default class MongoMessageRepository implements IMessageRepository {
    create(data: any): Promise<any> {
        return mongo.collection("messages").insertOne(data);
    }
    getConversationMessages(conversationId: string): any {
        return mongo.collection("messages").find({ conversationId });
    }
}
