import type { IUserItem } from "../types/users";

export async function getUsersByUsername(username: string) {
    const res = await fetch(`http://localhost:3333/users/${username}`);

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
