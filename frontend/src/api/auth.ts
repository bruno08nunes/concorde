export async function login(data: { email: string; password: string }) {
    const res = await fetch("http://localhost:3333/auth/login", {
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
    const res = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
