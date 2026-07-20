import { UserCreateInput } from './../../generated/prisma/models/User';
import { User } from "../../generated/prisma/client";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    create(data: UserCreateInput): Promise<User>;
}