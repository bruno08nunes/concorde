import {
    LucideUserPlus2,
    Mic,
    PhoneCall,
    Plus,
    Search,
    Settings,
    Video,
} from "lucide-react";

function App() {
    return (
        <div className="flex p-3 h-svh gap-6 text-white">
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
                    <button className="flex items-center gap-4 hover:bg-slate-700 p-1 rounded-2xl cursor-pointer">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                            alt=""
                            className="w-12 rounded-full object-cover aspect-square"
                        />
                        <span className="text-xl">Nome</span>
                    </button>
                    <button className="flex items-center gap-4 hover:bg-slate-700 p-1 rounded-2xl cursor-pointer">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                            alt=""
                            className="w-12 rounded-full object-cover aspect-square"
                        />
                        <span className="text-xl">Nome</span>
                    </button>
                </div>
                <hr />
                <div className="flex items-center gap-4 p-1">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                        alt=""
                        className="w-12 rounded-full object-cover aspect-square"
                    />
                    <span className="text-xl flex-1">Nome</span>
                    <button className="cursor-pointer hover:bg-slate-700 p-2 rounded-full">
                        <Settings />
                    </button>
                </div>
            </aside>
            <section className="flex-1 bg-slate-800 flex flex-col">
                <header className="flex items-center p-3 justify-between">
                    <span className="flex items-center gap-4">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                            alt=""
                            className="w-12 rounded-full object-cover aspect-square"
                        />
                        <span className="text-xl flex-1">Nome</span>
                    </span>
                    <div className="flex gap-3">
                        <button className="cursor-pointer hover:bg-slate-700 p-2 rounded-full">
                            <PhoneCall />
                        </button>
                        <button className="cursor-pointer hover:bg-slate-700 p-2 rounded-full">
                            <Video />
                        </button>
                        <button className="cursor-pointer hover:bg-slate-700 p-2 rounded-full">
                            <LucideUserPlus2 />
                        </button>
                    </div>
                </header>
                <hr />
                <div className="flex flex-col p-3 gap-2 flex-1">
                  <div className="bg-slate-700 w-fit p-2 rounded-3xl rounded-bl-none">
                    <span className="text-sm text-green-500">Nome</span><br />
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="bg-slate-700 w-fit p-2 rounded-3xl rounded-bl-none">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="bg-slate-700 w-fit p-2 rounded-3xl rounded-bl-none">
                    <span className="text-sm text-green-500">Nome</span><br />
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="bg-slate-700 w-fit p-2 rounded-3xl rounded-bl-none">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="bg-indigo-700 w-fit p-2 rounded-3xl rounded-br-none self-end">
                    Lorem ipsum dolor sit amet.
                  </div>
                </div>
                <hr />
                <div className="flex p-3 border m-2 rounded-full gap-2 focus-within:outline-1">
                  <button>
                    <Plus />
                  </button>
                  <input type="text" className="flex-1 p-1 focus:outline-0" placeholder="Digite uma mensagem..." />
                  <button>
                    <Mic />
                  </button>
                </div>
            </section>
        </div>
    );
}

export default App;
