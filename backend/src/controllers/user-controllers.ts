import { Request, Response } from "express";
import z from "zod";
import PrismaUserRepository from "../repositories/prisma/prisma-user-repository";
import { UserService } from "../services/user-services";
import { signJwt } from "../utils/jwt";

const userService = new UserService(new PrismaUserRepository());

export async function loginController(req: Request, res: Response) {
    const authenticationBodySchema = z.object({
        email: z.email("Email inválido"),
        password: z.string().max(20, "Tamanho máximo de senha excedido"),
    });

    const { email, password } = authenticationBodySchema.parse(req.body);

    try {
        const user = await userService.login(email, password);

        const token = signJwt({ id: user!.id });

        res.json({
            message: "Login realizado",
            data: { ...user, password: undefined },
            success: true,
            token,
        });
    } catch (err) {}
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

    try {
        const user = await userService.createUser({
            username,
            email,
            password,
        });

        const token = signJwt({ id: user!.id });

        res.status(201).json({
            message: "Cadastro realizado",
            success: true,
            token
        });
    } catch (err) {}
}
