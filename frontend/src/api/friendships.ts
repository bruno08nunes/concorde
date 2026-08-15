import { env } from "../lib/env";
import type { Friendship } from "../types/friendship";
import type { User } from "../types/users";

export async function getFriends(token: string) {
    const res = await fetch(`${env.VITE_API_URL}/friendships`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        throw new Error("Token inválido.");
    }

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

export async function listPendingFriendshipRequests({
    token,
}: {
    token: string;
}) {
    const res = await fetch(`${env.VITE_API_URL}/friendship/requests`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    if (!res.ok) {
        throw new Error("Erro ao buscar notificações.");
    }

    const data: {
        success: boolean;
        data: {
            createdAt: Date;
            id: number;
            receiverId: number;
            senderId: number;
            sender: User;
            updatedAt: Date;
        }[];
        message: string;
    } = await res.json();

    return data.data;
}

export async function sendFriendshipRequest({
    receiverId,
    token,
}: {
    receiverId: number;
    token: string;
}) {
    const res = await fetch(`${env.VITE_API_URL}/friendship/request`, {
        method: "POST",
        body: JSON.stringify({ receiverId }),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    if (res.status === 409) {
        throw new Error("Você já adicionou esse usuário!");
    }

    if (!res.ok) {
        throw new Error("Erro ao adicionar amigo.");
    }

    const data: {
        success: boolean;
        data: Friendship;
        message: string;
    } = await res.json();

    return data.data;
}

export async function declineFriendshipRequest({
    token,
    requestId,
}: {
    token: string;
    requestId: number;
}) {
    const res = await fetch(
        `${env.VITE_API_URL}/friendship/request/${requestId}/decline`,
        {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    );

    if (!res.ok) {
        throw new Error("Não foi possível rejeitar o pedido.");
    }

    const data: {
        success: boolean;
        data: Friendship;
        message: string;
    } = await res.json();

    return data.data;
}

export async function acceptFriendshipRequest({
    token,
    requestId,
}: {
    token: string;
    requestId: number;
}) {
    const res = await fetch(
        `${env.VITE_API_URL}/friendship/request/${requestId}/accept`,
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        },
    );

    if (!res.ok) {
        throw new Error("Não foi possível adicionar amigo.");
    }

    const data: {
        success: boolean;
        data: Friendship;
        message: string;
    } = await res.json();

    return data.data;
}
