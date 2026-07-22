import { env } from "../lib/env";

export async function login(data: { email: string; password: string }) {
    const res = await fetch(env.VITE_API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

export async function register(data: {
    username: string;
    email: string;
    password: string;
}) {
    const res = await fetch(env.VITE_API_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
