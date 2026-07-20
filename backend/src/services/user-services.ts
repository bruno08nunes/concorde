import { IUserRepository } from "../repositories/user-repository";
import { UserCreateInput } from "../../generated/prisma/models";
import { comparePassword, hashPassword } from "../utils/crypto";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            // Lançar erro
            return;
        }

        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            // Lançar erro
        }

        return user;
    }

    async createUser({ username, email, password }: UserCreateInput) {
        const existingUserWithEmail =
            await this.userRepository.findByEmail(email);

        if (existingUserWithEmail) {
            return;
        }

        const existingUserWithUsername = await this.userRepository.findByUsername(username);

        if (existingUserWithUsername) {
            return;
        }

        const hashedPassword = await hashPassword(password);

        return this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });
    }
}
