import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerAPI } from "../api/auth";
import Input from "../components/form/Input";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function Register() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: registerAPI,
        onSuccess(data) {
            login(data.data, data.token);
            navigate("/");
        },
    });

    const schema = z.object({
        username: z
            .string()
            .min(3, "Seu nome de usuário deve ter no mínimo 3 caracteres")
            .max(20, "Tamanho máximo de nome excedido (20)")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Seu nome deve conter apenas letras, números ou underlines (_)",
            ),
        email: z.email("Insira um email válido"),
        password: z
            .string()
            .min(6, "A senha deve ter ao menos 6 caracteres")
            .max(20, "A senha deve ter ao máximo 20 caracteres"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    return (
        <div className="min-h-svh flex justify-center items-center">
            <form
                onSubmit={handleSubmit((data) => mutation.mutate(data))}
                className="flex flex-col p-8 gap-4 w-100 bg-slate- 700 border-indigo-600 border-4 text-white rounded-2xl"
            >
                <h2 className="text-4xl text-center text-shadow-indigo-600 text-shadow-lg">
                    Login
                </h2>
                <Input
                    type="text"
                    id="username"
                    {...register("username")}
                    label="Nome de usuário:"
                    placeholder="Nome de usuário"
                    autoFocus
                    errorMessage={errors.username?.message}
                    required
                    maxLength={20}
                />
                <Input
                    type="email"
                    id="email"
                    {...register("email")}
                    label="Email:"
                    placeholder="Email"
                    errorMessage={errors.email?.message}
                />
                <Input
                    type="password"
                    id="password"
                    {...register("password")}
                    label="Senha:"
                    placeholder="Senha"
                    errorMessage={errors.password?.message}
                    maxLength={20}
                />

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="border-4 border-indigo-600 p-2 rounded-2xl text-lg cursor-pointer hover:bg-indigo-600 focus:bg-indigo-600 duration-[.4s]"
                >
                    {mutation.isPending ? "Entrando" : "Entrar"}
                </button>
            </form>
        </div>
    );
}

export default Register;
