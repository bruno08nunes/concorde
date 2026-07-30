import { IUserRepository } from "../repositories/user-repository";
import { UserCreateInput } from "../../generated/prisma/models";
import { comparePassword, hashPassword } from "../utils/crypto";
import {
    InvalidCredentialsError,
    NotFound,
    UserAlreadyExistsError,
} from "../utils/errors/error";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async getUserById(id: number) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFound("Usuário não encontrado.");
        }

        return user;
    }

    async getUserByUsername(username: string, userId: number) {
        return this.userRepository.findByUsername(username, userId);
    }

    async searchUsersByUsername(username: string) {
        return this.userRepository.searchUsersByUsername(username);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isPasswordCorrect = await comparePassword(
            password,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError();
        }

        return user;
    }

    async createUser({ username, email, password }: UserCreateInput) {
        const existingUserWithEmail =
            await this.userRepository.findByEmail(email);

        if (existingUserWithEmail) {
            throw new UserAlreadyExistsError("email");
        }

        const existingUserWithUsername =
            await this.userRepository.findByUsername(username);

        if (existingUserWithUsername) {
            throw new UserAlreadyExistsError("nome de usuário");
        }

        const hashedPassword = await hashPassword(password);

        return this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });
    }
}
