import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { Toaster } from "sonner";
import { useSocket } from "../hooks/useSocket";
import CallModal from "../components/CallModal";

function App() {
    useSocket();

    return (
        <div className="flex p-3 h-svh gap-6 text-white">
            <Sidebar />
            <section className="flex-1 bg-slate-800 flex flex-col rounded-lg">
                <Outlet />
            </section>
            <Toaster />
            <CallModal />
        </div>
    );
}

export default App;
