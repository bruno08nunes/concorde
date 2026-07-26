import { FriendshipRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { FriendshipAlreadyExists } from "../../utils/errors/friendship-errors";
import { IFriendshipRepository } from "../friendship-repository";

export default class PrismaFriendshipRepository implements IFriendshipRepository {
    async getFriends(userId: number) {
        return prisma.$queryRaw<
            {
                friendshipId: number;
                createdAt: Date;
                endedAt: Date | null;
                friend: {
                    id: number;
                    username: string;
                    email: string;
                    profilePictureId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    deletedAt: Date | null;
                };
            }[]
            >`
                SELECT DISTINCT ON (
                    LEAST(f."user1Id", f."user2Id"),
                    GREATEST(f."user1Id", f."user2Id")
                )
                    f.id AS "friendshipId",
                    f."createdAt",
                    f."endedAt",
                    json_build_object(
                        'id', u.id,
                        'username', u.username,
                        'profilePictureId', u."profilePictureId",
                        'createdAt', u."createdAt",
                        'updatedAt', u."updatedAt",
                        'deletedAt', u."deletedAt"
                    ) AS friend
                FROM "Friendship" f
                JOIN "User" u
                    ON u.id = CASE
                        WHEN f."user1Id" = ${userId} THEN f."user2Id"
                        ELSE f."user1Id"
                    END
                WHERE
                    f."user1Id" = ${userId}
                    OR f."user2Id" = ${userId}
                ORDER BY
                    LEAST(f."user1Id", f."user2Id"),
                    GREATEST(f."user1Id", f."user2Id"),
                    CASE WHEN f."endedAt" IS NULL THEN 0 ELSE 1 END,
                    f."createdAt" DESC;
            `;
    }

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
