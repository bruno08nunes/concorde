import { useEffect } from "react";
import { socket } from "../lib/socket";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSocketEvent(eventName: string, callback: (...args: any[]) => void) {
    useEffect(() => {
        socket.on(eventName, callback);

        return () => {
            socket.off(eventName, callback);
        };
    }, [eventName, callback]);
}
