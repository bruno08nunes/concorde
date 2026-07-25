import { FriendshipRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { FriendshipAlreadyExists } from "../../utils/errors/friendship-errors";
import { IFriendshipRepository } from "../friendship-repository";

export default class PrismaFriendshipRepository implements IFriendshipRepository {
    getRequestById(id: number) {
        return prisma.friendshipRequest.findUnique({ where: { id } });
    }

    getLatestRequestByUsers(user1Id: number, user2Id: number) {
        return prisma.friendshipRequest.findFirst({
            where: {
                OR: [
                    {
                        senderId: user1Id,
                        receiverId: user2Id,
                    },
                    {
                        senderId: user2Id,
                        receiverId: user1Id,
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
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

    getActiveFriendship(friend1Id: number, friend2Id: number) {
        return prisma.friendship.findFirst({
            where: {
                user1Id: friend1Id,
                user2Id: friend2Id,
                endedAt: null,
            },
        });
    }

    createFriendship(friend1Id: number, friend2Id: number) {
        return prisma.friendship.create({
            data: { user1Id: friend1Id, user2Id: friend2Id },
        });
    }

    endFriendship(friendshipId: number) {
        return prisma.friendship.update({
            where: {
                id: friendshipId,
                endedAt: null,
            },
            data: {
                endedAt: new Date(),
            },
        });
    }

    acceptRequestAndCreateFriendship(friendshipRequest: {
        id: number;
        senderId: number;
        receiverId: number;
    }) {
        const friend1Id = Math.min(
            friendshipRequest.senderId,
            friendshipRequest.receiverId,
        );

        const friend2Id = Math.max(
            friendshipRequest.senderId,
            friendshipRequest.receiverId,
        );

        return prisma.$transaction(async (tx) => {
            const friendship = await tx.friendship.findFirst({
                where: {
                    user1Id: friend1Id,
                    user2Id: friend2Id,
                    endedAt: null,
                },
            });

            if (friendship) {
                throw new FriendshipAlreadyExists();
            }

            await tx.friendshipRequest.update({
                where: {
                    id: friendshipRequest.id,
                },
                data: {
                    status: FriendshipRequestStatus.ACCEPTED,
                },
            });

            return tx.friendship.create({
                data: {
                    user1Id: friend1Id,
                    user2Id: friend2Id,
                },
            });
        });
    }
}
