import { IFriendshipRepository } from "../repositories/friendship-repository";
import { InvalidRequest } from "../utils/errors/error";
import {
    FriendshipAlreadyExists,
    FriendshipRequestAlreadyExists,
    FriendshipRequestBlocked,
} from "../utils/errors/friendship-errors";

export class FriendshipService {
    constructor(private friendshipRepository: IFriendshipRepository) {}

    async sendRequest(senderId: number, receiverId: number) {
        if (senderId === receiverId) {
            throw new InvalidRequest(
                "Não é possível enviar uma solicitação para si mesmo.",
            );
        }

        const friendshipRequest =
            await this.friendshipRepository.getRequestBySenderIdAndReceiverId(
                senderId,
                receiverId,
            );
        if (friendshipRequest && friendshipRequest.status === "PENDING") {
            throw new FriendshipRequestAlreadyExists();
        }
        if (
            friendshipRequest &&
            friendshipRequest.status === "REJECTED"
        ) {
            const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - friendshipRequest.createdAt.getTime() < oneWeekInMs) { // TODO: Criar um updated at e verificar ele
                throw new FriendshipRequestBlocked();
            }

            const newFriendshipRequest = await this.friendshipRepository.changeRequestStatus(friendshipRequest.id, "PENDING");

            return { ...newFriendshipRequest, type: "request" } as const;
        }

        const friend1Id = Math.min(senderId, receiverId);
        const friend2Id = Math.max(senderId, receiverId);

        const reverseFriendshipRequest =
            await this.friendshipRepository.getRequestBySenderIdAndReceiverId(
                receiverId,
                senderId,
            );
        if (
            reverseFriendshipRequest &&
            reverseFriendshipRequest.status === "PENDING"
        ) {
            const friendship = await this.createFriendship(
                friend1Id,
                friend2Id,
                reverseFriendshipRequest.id,
            );
            return { ...friendship, type: "friendship" } as const;
        }

        // Todo: verificar se a amizade não foi encerrada
        const friendship = await this.friendshipRepository.getFriendship(
            friend1Id,
            friend2Id,
        );
        if (friendship) {
            throw new FriendshipAlreadyExists();
        }

        if (friendshipRequest && friendshipRequest.status === "ACCEPTED") {
            await this.friendshipRepository.changeRequestStatus(
                friendshipRequest.id,
                "REJECTED",
            );
            throw new FriendshipRequestBlocked();
        }

        const newRequest = await this.friendshipRepository.createRequest(
            senderId,
            receiverId,
        );

        return { ...newRequest, type: "request" } as const;
    }

    async createFriendship(
        friend1Id: number,
        friend2Id: number,
        friendshipRequestId: number,
    ) {
        // Todo: Transformar em uma transação só
        // Todo: verificar se o request de fato tem os usuários enviados
        await this.friendshipRepository.changeRequestStatus(
            friendshipRequestId,
            "ACCEPTED",
        );

        const friendship = await this.friendshipRepository.getFriendship(
            friend1Id,
            friend2Id,
        );
        if (friendship) {
            throw new FriendshipAlreadyExists();
        }

        return this.friendshipRepository.createFriendship(friend1Id, friend2Id);
    }
}
