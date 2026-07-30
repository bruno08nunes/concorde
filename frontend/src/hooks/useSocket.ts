import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useAuthStore } from "../stores/authStore";

export function useSocket() {
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            socket.disconnect();
            return;
        }

        socket.auth = { token };

        if (!socket.connected) {
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, [token]);
}