import { env } from "../lib/env";
import type { SendMessage } from "../types/messages";

export async function getMessages(
    receiverId: number,
    token: string,
    before?: string,
    limit: number = 30,
) {
    const res = await fetch(
        `${env.VITE_API_URL}/messages/${receiverId}?limit=${limit}${before ? "&before=" + before : ""}`,
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    );

    if (!res.ok) {
        throw new Error("Erro ao buscar mensagens.");
    }

    const data: {
        success: boolean;
        data: SendMessage[];
        message: string;
    } = await res.json();

    return data.data;
}
