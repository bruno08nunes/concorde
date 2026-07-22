import { env } from "../lib/env";

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
