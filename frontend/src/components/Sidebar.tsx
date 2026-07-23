import { Search, Settings } from "lucide-react";
import UserListItem from "./UserListItem";
import IconButton from "./IconButton";

export default function Sidebar() {
    return (
        <aside className="bg-slate-800 rounded-lg p-4 flex flex-col gap-4">
            <div className="flex gap-2">
                <span className="flex border rounded-lg p-1 focus-within:outline-1 outline-white items-center">
                    <input
                        type="text"
                        className="focus:outline-0"
                        id="search"
                    />
                    <label htmlFor="search" className="cursor-pointer">
                        <Search />
                    </label>
                </span>
                <button className="py-1 px-2 rounded-xl cursor-pointer hover:bg-indigo-600 border-3 border-indigo-600 duration-[.4s]">
                    Adicionar Amigo
                </button>
            </div>
            <hr />
            <div className="flex-1 flex flex-col gap-3 overflow-auto">
                <UserListItem
                    imgURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                    name="Nome"
                />
                <UserListItem
                    imgURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                    name="Nome"
                />
            </div>
            <hr />
            <div className="flex items-center gap-4 p-1">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                    alt=""
                    className="w-12 rounded-full object-cover aspect-square"
                />
                <span className="text-xl flex-1">Nome</span>
                <IconButton>
                    <Settings />
                </IconButton>
            </div>
        </aside>
    );
}
