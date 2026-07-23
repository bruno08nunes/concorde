import { LucideUserPlus2, Mic, PhoneCall, Plus, Video } from "lucide-react";
import Sidebar from "../components/Sidebar";
import IconButton from "../components/IconButton";
import Message from "../components/Message";

function App() {
    return (
        <div className="flex p-3 h-svh gap-6 text-white">
            <Sidebar />
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
                        <IconButton>
                            <PhoneCall />
                        </IconButton>
                        <IconButton>
                            <Video />
                        </IconButton>
                        <IconButton>
                            <LucideUserPlus2 />
                        </IconButton>
                    </div>
                </header>
                <hr />
                <div className="flex flex-col p-3 gap-2 flex-1 overflow-auto">
                  <Message name="Nome" message="Lorem ipsum dolor sit amet." />
                  <Message message="Lorem ipsum dolor sit amet." />
                  <Message name="Nome" message="Lorem ipsum dolor sit amet." />
                  <Message message="Lorem ipsum dolor sit amet." />
                  <Message message="Lorem ipsum dolor sit amet." isOwnMessage={true} />
                </div>
                <hr />
                <div className="flex p-3 border m-2 rounded-full gap-2 focus-within:outline-1">
                    <IconButton>
                        <Plus />
                    </IconButton>
                    <input
                        type="text"
                        className="flex-1 p-1 focus:outline-0"
                        placeholder="Digite uma mensagem..."
                    />
                    <IconButton>
                        <Mic />
                    </IconButton>
                </div>
            </section>
        </div>
    );
}

export default App;
