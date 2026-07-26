import { User } from "../../../generated/prisma/client";
import { UserCreateInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IUserRepository } from "../user-repository";

export default class PrismaUserRepository implements IUserRepository {
    findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
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

    findByUsername(username: string) {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    create(data: UserCreateInput): Promise<User> {
        return prisma.user.create({
            data,
        });
    }
}
