import { FriendshipRequestStatus } from "../../generated/prisma/enums";
import { IFriendshipRepository } from "../repositories/friendship-repository";
import { InvalidRequest, NotFound } from "../utils/errors/error";
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

        const friend1Id = Math.min(senderId, receiverId);
        const friend2Id = Math.max(senderId, receiverId);

        const friendship = await this.friendshipRepository.getActiveFriendship(
            friend1Id,
            friend2Id,
        );
        if (friendship) {
            throw new FriendshipAlreadyExists();
        }

        const friendshipRequest =
            await this.friendshipRepository.getLatestRequestByUsers(
                senderId,
                receiverId,
            );

        const isReverseRequestPending =
            friendshipRequest &&
            friendshipRequest?.senderId === receiverId &&
            FriendshipRequestStatus.PENDING;
        if (isReverseRequestPending) {
            const friendship = await this.createFriendship(
                friendshipRequest.id,
            );
            return { ...friendship, type: "friendship" } as const;
        }

        if (
            friendshipRequest &&
            friendshipRequest.status === FriendshipRequestStatus.PENDING
        ) {
            throw new FriendshipRequestAlreadyExists();
        }

        if (
            friendshipRequest &&
            friendshipRequest.status === FriendshipRequestStatus.REJECTED
        ) {
            const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
            const lastRequestIsRecent =
                Date.now() - friendshipRequest.updatedAt.getTime() <
                oneWeekInMs;

            if (lastRequestIsRecent) {
                throw new FriendshipRequestBlocked();
            }
        }

        const newRequest = await this.friendshipRepository.createRequest(
            senderId,
            receiverId,
        );

        return { ...newRequest, type: "request" } as const;
    }

    async getAllFriends(userId: number) {
        return this.friendshipRepository.getFriends(userId);
    }

    async createFriendship(friendshipRequestId: number) {
        const friendshipRequest =
            await this.friendshipRepository.getRequestById(friendshipRequestId);

        if (!friendshipRequest) {
            throw new NotFound("Pedido de amizade não encontrado!");
        }

        if (friendshipRequest.status !== FriendshipRequestStatus.PENDING) {
            throw new InvalidRequest(
                "Essa solicitação não pode mais ser aceita.",
            );
        }

        return this.friendshipRepository.acceptRequestAndCreateFriendship(
            friendshipRequest,
        );
    }
}
