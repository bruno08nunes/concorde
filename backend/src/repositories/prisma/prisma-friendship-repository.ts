import { FriendshipRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IFriendshipRepository } from "../friendship-repository";

export default class PrismaFriendshipRepository implements IFriendshipRepository {
    getRequestById(id: number) {
        return prisma.friendshipRequest.findUnique({ where: { id } });
    }

    getRequestBySenderIdAndReceiverId(senderId: number, receiverId: number) {
        return prisma.friendshipRequest.findUnique({
            where: {
                receiverId_senderId: {
                    receiverId,
                    senderId,
                },
            },
        });
    }

    createRequest(senderId: number, receiverId: number) {
        return prisma.friendshipRequest.create({
            data: { senderId, receiverId },
        });
    }

    changeRequestStatus(requestId: number, newStatus: FriendshipRequestStatus) {
        return prisma.friendshipRequest.update({
            where: { id: requestId },
            data: { status: newStatus },
        });
    }

    getFriendship(friend1Id: number, friend2Id: number) {
        return prisma.friendship.findUnique({
            where: {
                user1Id_user2Id: { user1Id: friend1Id, user2Id: friend2Id },
            },
        });
    }

    createFriendship(friend1Id: number, friend2Id: number) {
        return prisma.friendship.create({
            data: { user1Id: friend1Id, user2Id: friend2Id },
        });
    }

    excludeFriendship(friend1Id: number, friend2Id: number) {
        return prisma.friendship.delete({
            where: {
                user1Id_user2Id: { user1Id: friend1Id, user2Id: friend2Id },
            },
        });
    }
}
