import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import { useAuthStore } from "../stores/authStore";
import useTitle from "../hooks/useTitle";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Input from "../components/form/Input";
import { updateUser } from "../api/users";

export default function ConfigPage() {
    const { logout, login, token, user } = useAuthStore();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    useTitle("Configurações");

    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess(data) {
            login(data.data, token!);
            navigate(0);
        },
        onError(err) {
            toast(err.message, {
                style: { color: "red" },
                position: "top-center",
            });
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
            )
            .optional()
            .or(z.literal("")),
        email: z.email("Insira um email válido").optional().or(z.literal("")),
        password: z
            .string()
            .min(6, "A senha deve ter ao menos 6 caracteres")
            .max(20, "A senha deve ter ao máximo 20 caracteres")
            .optional()
            .or(z.literal("")),
        newPassword: z
            .string()
            .min(6, "A senha deve ter ao menos 6 caracteres")
            .max(20, "A senha deve ter ao máximo 20 caracteres")
            .optional()
            .or(z.literal("")),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    return (
        <section className="flex flex-col gap-4 p-3 h-full">
            <h1 className="text-2xl">Configurações</h1>
            <hr />
            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit((data) => {
                        const updateData = Object.fromEntries(
                            Object.entries(data).filter(
                                ([, value]) => value !== "",
                            ),
                        );

                        mutation.mutate({
                            token: token!,
                            ...updateData,
                        });
                    })}
                    className="flex flex-col p-8 gap-4 w-[50%] rounded-2xl"
                >
                    <h2 className="text-4xl text-center text-shadow-indigo-600 text-shadow-lg">
                        Editar Perfil
                    </h2>
                    <Input
                        type="text"
                        id="username"
                        {...register("username")}
                        label="Nome de usuário:"
                        placeholder="Nome de usuário"
                        autoFocus
                        errorMessage={errors.username?.message}
                        maxLength={20}
                        autoComplete="username"
                        defaultValue={user?.username}
                    />
                    <Input
                        type="email"
                        id="email"
                        {...register("email")}
                        label="Email:"
                        placeholder="Email"
                        errorMessage={errors.email?.message}
                        autoComplete="email"
                        defaultValue={user?.email}
                    />
                    <Input
                        type="password"
                        id="password"
                        {...register("password")}
                        label="Senha Atual:"
                        placeholder="Senha atual"
                        errorMessage={errors.password?.message}
                        maxLength={20}
                        autoComplete="current-password"
                    />
                    <Input
                        type="password"
                        id="newPassword"
                        {...register("newPassword")}
                        label="Nova Senha:"
                        placeholder="Nova senha"
                        errorMessage={errors.newPassword?.message}
                        maxLength={20}
                        autoComplete="new-password"
                    />

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="border-4 border-indigo-600 p-2 rounded-2xl text-lg cursor-pointer hover:bg-indigo-600 focus:bg-indigo-600 duration-[.4s]"
                    >
                        {mutation.isPending ? "Enviando" : "Editar"}
                    </button>
                </form>
            </div>
            <div className="flex-1 flex items-end">
                <Button onClick={handleLogout} text="Deslogar" />
            </div>
        </section>
    );
}
