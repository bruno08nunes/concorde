import { PhoneCall, Video } from "lucide-react";
import IconButton from "../IconButton";
import { useWebRTCContext } from "../../contexts/WebRTCContext";

export default function StartCallButtons({
    conversationId,
    user,
}: {
    conversationId: number;
    user: { username: string; profilePictureUrl: string | undefined };
}) {
    const { startCall, setCalledUser } = useWebRTCContext();

    return (
        <>
            <IconButton
                onClick={() => {
                    setCalledUser(user);
                    startCall(conversationId, false);
                }}
            >
                <PhoneCall />
            </IconButton>
            <IconButton
                onClick={() => {
                    setCalledUser(user);
                    startCall(conversationId, true);
                }}
            >
                <Video />
            </IconButton>
        </>
    );
}
