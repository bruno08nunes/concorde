import { UserCircle } from "lucide-react";

const sizes = {
    "12x12": "w-12 h-12",
    "24x24": "w-24 h-24"
}

export default function ProfilePicture({ imgURL, size = "12x12" }: { imgURL: string | null, size?: keyof typeof sizes }) {

    return (
        <>
            {imgURL ? (
                <img
                    src={imgURL}
                    alt=""
                    className={"w-12 rounded-full object-cover aspect-square" + sizes[size]}
                />
            ) : (
                <UserCircle className={sizes[size]} />
            )}
        </>
    );
}
