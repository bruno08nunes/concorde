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
