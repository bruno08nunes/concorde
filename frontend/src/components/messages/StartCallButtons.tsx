import { PhoneCall, Video } from "lucide-react";
import IconButton from "../IconButton";
import { useWebRTCContext } from "../../contexts/WebRTCContext";

export default function StartCallButtons({
    conversationId,
}: {
    conversationId: number;
}) {
    const { startCall } = useWebRTCContext();

    return (
        <>
            <IconButton
                onClick={() => {
                    startCall(conversationId);
                }}
            >
                <PhoneCall />
            </IconButton>
            <IconButton>
                <Video />
            </IconButton>
        </>
    );
}
