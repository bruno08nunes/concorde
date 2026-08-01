import { IMessageRepository } from "../repositories/message-repository";
import MongoMessageRepository from "../repositories/mongo/mongo-message-repository";

export class MessageService {
    constructor(private messagesRepository: IMessageRepository) {}

    createMessage(data: any) {
        return this.messagesRepository.create(data);
    }
}

const messageService = new MessageService(new MongoMessageRepository());
export default messageService;