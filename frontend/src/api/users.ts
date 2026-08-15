import { env } from "../lib/env";
import type { IUserItem, User } from "../types/users";

export async function getUserByUsername(username: string, token: string) {
    const res = await fetch(`${env.VITE_API_URL}/user/${username}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    if (!res.ok) {
        throw new Error("Erro ao buscar usuário.");
    }

    const data: {
        success: boolean;
        data: User;
        message: string;
    } = await res.json();

    return data.data;
}

export async function getUsersByUsername(username: string) {
    const res = await fetch(`${env.VITE_API_URL}/users/${username}`);

    if (!res.ok) {
        throw new Error("Erro ao buscar usuários.");
    }

    const data: {
        success: boolean;
        data: IUserItem[];
        message: string;
    } = await res.json();

    return data.data;
}
