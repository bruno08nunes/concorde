import { useEffect, useRef } from "react";

export function useChatScroll<T>(
    dependency: T,
    conversationId: number,
    isFriendTyping: boolean,
) {
    const chatRef = useRef<HTMLDivElement>(null);
    const hasScrolledInitially = useRef(false);

    useEffect(() => {
        hasScrolledInitially.current = false;
    }, [conversationId]);

    useEffect(() => {
        if (hasScrolledInitially.current) return;
        if (!chatRef.current) return;
        if (!dependency) return;

        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        hasScrolledInitially.current = true;
    }, [dependency]);

    useEffect(() => {
        if (!chatRef.current || !hasScrolledInitially.current) return;

        const chat = chatRef.current;

        const distance = chat.scrollHeight - chat.scrollTop - chat.clientHeight;

        if (distance < 100) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [dependency]);

    useEffect(() => {
        const element = chatRef.current;

        if (!element) {
            return;
        }

        const distance =
            element.scrollHeight - element.scrollTop - element.clientHeight;

        if (distance < 100) {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [isFriendTyping]);

    return chatRef;
}
