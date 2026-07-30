import { env } from "../lib/env";
import type { User } from "../types/users";

export async function getMe(token: string) {
    const res = await fetch("http://localhost:3333/auth/me", {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    if (!res.ok) {
        throw new Error("Não foi possível encontrar sua conta");
    }

    const result = await res.json();

    return result.data as User;
}

export async function login(data: { email: string; password: string }) {
    try {
        const res = await fetch(env.VITE_API_URL + "/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (err) {
        if (err instanceof TypeError) {
            throw new Error(
                "Erro ao fazer login. Tente novamente mais tarde!",
                { cause: err },
            );
        }

        throw err;
    }
}

export async function register(data: {
    username: string;
    email: string;
    password: string;
}) {
    try {
        const res = await fetch(env.VITE_API_URL + "/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (err) {
        if (err instanceof TypeError) {
            throw new Error(
                "Erro ao fazer cadastro. Tente novamente mais tarde!",
                { cause: err },
            );
        }

        throw err;
    }
}
