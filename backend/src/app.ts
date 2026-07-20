import express from "express";
import cors from "cors";
import z from "zod";
import { prisma } from "./lib/prisma";
import { compare, hash } from "bcrypt";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/auth/login", async (req, res) => {
    const authenticationBodySchema = z.object({
        email: z.email("Email inválido"),
        password: z.string().max(20, "Tamanho máximo de senha excedido"),
    });

    const { email, password } = authenticationBodySchema.parse(req.body);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            // Lançar erro
            return;
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            // Lançar erro
        }

        // Criar token

        res.json({
            message: "Login realizado",
            data: { ...user, password: undefined },
            success: true,
            // token
        });
    } catch (err) {}
});
app.post("/auth/register", async (req, res) => {
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
        const existingUserWithEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUserWithEmail) {
            return;
        }

        const existingUserWithUsername = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUserWithUsername) {
            return;
        }

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Criar token

        res.status(201).json({
            message: "Cadastro realizado",
            success: true,
            // token
        });
    } catch (err) {}
});
// app.get("/auth/me");

export default app;
