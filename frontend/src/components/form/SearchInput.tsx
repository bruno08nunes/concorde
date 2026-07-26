import { Search } from "lucide-react";
import type { HTMLAttributes } from "react";

export default function SearchInput({
    onChange,
    id = "search",
}: HTMLAttributes<HTMLInputElement>) {
    return (
        <span className="flex border rounded-lg p-1 focus-within:outline-1 outline-white items-center">
            <input
                type="text"
                className="focus:outline-0"
                id={id}
                onChange={onChange}
                maxLength={20}
            />
            <label htmlFor={id} className="cursor-pointer">
                <Search />
            </label>
        </span>
    );
}
