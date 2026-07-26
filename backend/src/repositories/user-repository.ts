import { UserCreateInput } from "./../../generated/prisma/models/User";
import { User } from "../../generated/prisma/client";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<Partial<User> | null>;
    searchUsersByUsername(username: string): Promise<
        {
            id: number;
            username: string;
            profilePictureId: number | null;
            profilePictureUrl: string | null;
        }[]
    >;
    create(data: UserCreateInput): Promise<User>;
}
