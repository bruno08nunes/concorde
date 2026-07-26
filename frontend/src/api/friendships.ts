import type { Friendship } from "../types/friendship";

export async function getFriends(token: string) {
    const res = await fetch("http://localhost:3333/friendships", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Erro ao buscar amigos.");
    }

    const data: {
        success: boolean;
        data: Friendship[];
        message: string;
    } = await res.json();

    return data.data;
}
