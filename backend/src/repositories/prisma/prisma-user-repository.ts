import { User } from "../../../generated/prisma/client";
import {
    UserCreateInput,
    UserUpdateInput,
} from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IUserRepository } from "../user-repository";

export default class PrismaUserRepository implements IUserRepository {
    findById(id: number) {
        return prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                profilePicture: {
                    select: {
                        url: true,
                    },
                },
            },
        });
    }

    findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                profilePicture: {
                    select: {
                        url: true,
                    },
                },
            },
        });
    }

    async findByUsername(username: string, userId?: number) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            omit: {
                password: true,
            },
            include: {
                profilePicture: {
                    select: {
                        url: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        if (!userId) {
            return {
                ...user,
                isFriend: false,
            };
        }

        const friendship = await prisma.friendship.findFirst({
            where: {
                endedAt: null,
                OR: [
                    {
                        user1Id: userId,
                        user2Id: user.id,
                    },
                    {
                        user1Id: user.id,
                        user2Id: userId,
                    },
                ],
            },
            select: {
                id: true,
            },
        });

        return {
            ...user,
            isFriend: friendship !== null,
            isYou: userId === user.id,
        };
    }

    searchUsersByUsername(username: string) {
        return prisma.$queryRaw<
            {
                id: number;
                username: string;
                profilePictureId: number | null;
                profilePictureUrl: string | null;
            }[]
        >`
            SELECT
                u.id,
                u.username,
                u."profilePictureId",
                f.url AS "profilePictureUrl"
            FROM "User" u
            LEFT JOIN "File" f
                ON f.id = u."profilePictureId"
            WHERE
                u."deletedAt" IS NULL
                AND u.username ILIKE ${`%${username}%`}
            ORDER BY
                CASE
                    WHEN LOWER(u.username) = LOWER(${username}) THEN 0
                    WHEN LOWER(u.username) LIKE LOWER(${`${username}%`}) THEN 1
                    ELSE 2
                END,
                u.username
            LIMIT 20;
        `;
    }

    create(data: UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
        });
    }

    update(id: number, data: UserUpdateInput) {
        return prisma.user.update({
            where: { id },
            data,
            include: { profilePicture: true },
        });
    }
}
