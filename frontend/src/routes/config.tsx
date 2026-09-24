import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import { useAuthStore } from "../stores/authStore";
import useTitle from "../hooks/useTitle";

export default function ConfigPage() {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    useTitle("Configurações");

    return (
        <section className="flex flex-col gap-4 p-3 h-full">
            <h1 className="text-2xl">Configurações</h1>
            <hr />
            <div className="flex-1 flex items-end">
                <Button onClick={handleLogout} text="Deslogar" />
            </div>
        </section>
    );
}
