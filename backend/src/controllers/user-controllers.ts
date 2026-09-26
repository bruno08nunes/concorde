import { Request, Response } from "express";
import z from "zod";
import PrismaUserRepository from "../repositories/prisma/prisma-user-repository";
import { UserService } from "../services/user-services";
import { signJwt } from "../utils/jwt";

const userService = new UserService(new PrismaUserRepository());

export async function getMe(req: Request, res: Response) {
    const userId = req.user?.id;

    const user = await userService.getUserById(userId!);

    res.json({
        success: true,
        message: "Usuário encontrado.",
        data: user,
    });
}

export async function getUserByUsername(req: Request, res: Response) {
    const searchBodySchema = z.object({
        username: z
            .string()
            .min(3, "Seu nome de usuário deve ter no mínimo 3 caracteres")
            .max(20, "Tamanho máximo de nome excedido (20)")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Seu nome deve conter apenas letras, números ou underlines (_)",
            ),
    });

    const { username } = searchBodySchema.parse(req.params);
    const userId = req.user!.id;

    const user = await userService.getUserByUsername(username, userId);

    res.json({
        success: true,
        message: "Usuário encontrado.",
        data: user,
    });
}

export async function searchUsersByUsername(req: Request, res: Response) {
    const searchBodySchema = z.object({
        username: z
            .string()
            .min(3, "Seu nome de usuário deve ter no mínimo 3 caracteres")
            .max(20, "Tamanho máximo de nome excedido (20)")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Seu nome deve conter apenas letras, números ou underlines (_)",
            ),
    });

    const { username } = searchBodySchema.parse(req.params);

    const users = await userService.searchUsersByUsername(username);

    res.json({
        success: true,
        message: "Usuários encontrados.",
        data: users,
    });
}

export async function loginController(req: Request, res: Response) {
    const authenticationBodySchema = z.object({
        email: z.email("Email inválido"),
        password: z.string().max(20, "Tamanho máximo de senha excedido"),
    });

    const { email, password } = authenticationBodySchema.parse(req.body);

    const user = await userService.login(email, password);

    const token = signJwt({ id: user!.id });

    res.json({
        message: "Login realizado",
        data: { ...user, password: undefined },
        success: true,
        token,
    });
}

export async function registerController(req: Request, res: Response) {
    const authenticationBodySchema = z.object({
        username: z
            .string()
            .min(3, "Seu nome de usuário deve ter no mínimo 3 caracteres")
            .max(20, "Tamanho máximo de nome excedido (20)")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Seu nome deve conter apenas letras, números ou underlines (_)",
            ),
        email: z.email("Email inválido"),
        password: z
            .string()
            .max(20, "Tamanho máximo de senha excedido (20)")
            .min(6, "A senha deve ter pelo menos 6 caracteres"),
    });

    const { username, email, password } = authenticationBodySchema.parse(
        req.body,
    );

    const user = await userService.createUser({
        username,
        email,
        password,
    });

    const token = signJwt({ id: user!.id });

    res.status(201).json({
        message: "Cadastro realizado",
        success: true,
        token,
        data: {
            ...user,
            profilePicture: null,
            password: undefined,
        },
    });
}

export async function updateUserController(req: Request, res: Response) {
    const updateUserBodySchema = z.object({
        username: z
            .string()
            .min(3, "Seu nome de usuário deve ter no mínimo 3 caracteres")
            .max(20, "Tamanho máximo de nome excedido (20)")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Seu nome deve conter apenas letras, números ou underlines (_)",
            )
            .optional(),

        email: z
            .email("Email inválido")
            .optional(),

        password: z
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(20, "Tamanho máximo de senha excedido (20)")
            .optional(),

        newPassword: z
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(20, "Tamanho máximo de senha excedido (20)")
            .optional(),
    });

    const { username, email, password, newPassword } =
        updateUserBodySchema.parse(req.body);

    const user = await userService.updateUser(req.user!.id, {
        username,
        email,
        password,
        newPassword,
    });

    res.status(200).json({
        message: "Usuário atualizado",
        success: true,
        data: {
            ...user,
            password: undefined,
        },
    });
}