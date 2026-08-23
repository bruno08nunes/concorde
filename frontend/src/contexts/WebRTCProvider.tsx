import type { ReactNode } from "react";

import { useWebRTC } from "../hooks/useWebRTC";
import { WebRTCContext } from "./WebRTCContext";

interface Props {
    children: ReactNode;
}

export function WebRTCProvider({ children }: Props) {
    const webRTC = useWebRTC();

    return (
        <WebRTCContext.Provider value={webRTC}>
            {children}
        </WebRTCContext.Provider>
    );
}
