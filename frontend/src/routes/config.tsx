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
import ImagePicker from "../components/form/ImagePicker";
import { uploadFiles } from "../api/files";

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
        profilePicture: z
            .instanceof(FileList)
            .optional()
            .refine(
                (files) =>
                    !files ||
                    files.length === 0 ||
                    files[0].size <= 5 * 1024 * 1024,
                "A imagem deve ter no máximo 5 MB",
            )
            .refine(
                (files) =>
                    !files ||
                    files.length === 0 ||
                    ["image/jpeg", "image/png", "image/webp"].includes(
                        files[0].type,
                    ),
                "A imagem deve ser JPG, PNG ou WebP",
            ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    return (
        <section className="flex flex-col gap-4 p-3 h-full overflow-auto">
            <div className="fixed">
                <Button onClick={handleLogout} text="Deslogar" />
            </div>
            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit(async (data) => {
                        try {
                            let profilePictureId: number | undefined;
                            
                            console.log(data.profilePicture);
                            if (data.profilePicture && data.profilePicture[0]) {
                                const formData = new FormData();

                                formData.append(
                                    "files",
                                    data.profilePicture[0],
                                );

                                const uploadedFiles =
                                    await uploadFiles(formData);
                                

                                profilePictureId = uploadedFiles[0].fileId;
                            }

                            const updateData = Object.fromEntries(
                                Object.entries(data).filter(
                                    ([, value]) => value !== "",
                                ),
                            );

                            mutation.mutate({
                                token: token!,
                                ...updateData,
                                profilePictureId,
                            });
                        } catch (err) {
                            toast.error(
                                err instanceof Error
                                    ? err.message
                                    : "Erro ao enviar a foto.",
                            );
                        }
                    })}
                    className="flex flex-col p-8 gap-4 w-[50%] rounded-2xl"
                >
                    <h2 className="text-4xl text-center text-shadow-indigo-600 text-shadow-lg">
                        Editar Perfil
                    </h2>
                    <ImagePicker {...register("profilePicture")} defaultProfilePictureUrl={user?.profilePicture?.url} />
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
        </section>
    );
}
