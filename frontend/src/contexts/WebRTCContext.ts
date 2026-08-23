import { createContext, useContext } from "react";

import { useWebRTC } from "../hooks/useWebRTC";

type WebRTCContextType = ReturnType<typeof useWebRTC>;

export const WebRTCContext = createContext<WebRTCContextType | null>(null);

export function useWebRTCContext() {
    const context = useContext(WebRTCContext);

    if (!context) {
        throw new Error("useWebRTCContext must be used inside WebRTCProvider");
    }

    return context;
}
