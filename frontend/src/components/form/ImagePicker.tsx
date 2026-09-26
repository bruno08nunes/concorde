import { useState, type InputHTMLAttributes } from "react";
import { toast } from "sonner";

export default function ImagePicker({
    defaultProfilePictureUrl,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    defaultProfilePictureUrl?: string;
}) {
    const [preview, setPreview] = useState<string | null>(
        defaultProfilePictureUrl ?? null,
    );

    function handleProfilePictureChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Selecione uma imagem válida.");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        props.onChange?.(event);
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden">
                {preview ? (
                    <img
                        src={preview === defaultProfilePictureUrl ? "http://localhost:3333/uploads/" + defaultProfilePictureUrl : preview}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-700">
                        Sem foto
                    </div>
                )}
            </div>

            <label
                htmlFor="profilePicture"
                className="border-2 border-indigo-600 px-4 py-2 rounded-xl cursor-pointer hover:bg-indigo-600 duration-[.4s]"
            >
                Escolher Foto
            </label>

            <input
                id="profilePicture"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                {...props}
                onChange={handleProfilePictureChange}
            />
        </div>
    );
}
