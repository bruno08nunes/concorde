import { FriendshipRequestStatus } from "../../generated/prisma/enums";
import { IFriendshipRepository } from "../repositories/friendship-repository";
import { Unauthorized } from "../utils/errors/auth-errors";
import { InvalidRequest, NotFound } from "../utils/errors/error";
import {
    FriendshipAlreadyExists,
    FriendshipRequestAlreadyExists,
    FriendshipRequestBlocked,
} from "../utils/errors/friendship-errors";

export class FriendshipService {
    constructor(private friendshipRepository: IFriendshipRepository) {}

    async listPendingFriendRequests(userId: number) {
        return this.friendshipRepository.listPendingFriendRequests(userId);
    }

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

    async declineFriendshipRequest(friendshipRequestId: number, receiverId: number) {
        const friendshipRequest = await this.friendshipRepository.getRequestById(friendshipRequestId);

        if (!friendshipRequest) {
            throw new NotFound("Requisição não encontrada.");
        }

        if (friendshipRequest?.receiverId !== receiverId) {
            throw new Unauthorized();
        }

        if (friendshipRequest.status !== FriendshipRequestStatus.PENDING) {
            throw new InvalidRequest("Não é possível recusar essa solicitação.");
        }

        return this.friendshipRepository.changeRequestStatus(friendshipRequestId, FriendshipRequestStatus.REJECTED);
    }

    async getAllFriends(userId: number) {
        return this.friendshipRepository.getFriends(userId);
    }

    async createFriendship(friendshipRequestId: number, receiverId?: number) {
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

        if (receiverId && friendshipRequest.receiverId !== receiverId) {
            throw new Unauthorized();
        }

        return this.friendshipRepository.acceptRequestAndCreateFriendship(
            friendshipRequest,
        );
    }
}
