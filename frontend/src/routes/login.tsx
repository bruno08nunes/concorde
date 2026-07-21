import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Login() {
    async function login(data: { email: string; password: string }) {
        const res = await fetch("http://localhost:3333/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
    }

    const mutation = useMutation({
        mutationFn: login,
        onSuccess(data) {
            // TOdo: Salva no estado global
            // localStorage.setItem("token", data.toke);
            // Todo: mudar de aba
            console.log(data);
        },
    });

    const schema = z.object({
        email: z.email("Insira um email válido"),
        password: z
            .string()
            .min(6, "A senha deve ter ao menos 6 caracteres")
            .max(20, "A senha deve ter ao máximo 20 caracteres"),
    });

    const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    return (
        <form
            onSubmit={handleSubmit((data) => mutation.mutate(data))}
            className="flex flex-col gap-4 w-100 mx-auto"
        >
            <input type="email" {...register("email")} className="border" />
            <input
                type="password"
                {...register("password")}
                className="border"
            />

            <button type="submit" disabled={mutation.isPending} className="border">
                {mutation.isPending ? "Entrando" : "Entrar"}
            </button>
        </form>
    );
}

export default Login;
