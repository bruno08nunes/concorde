import { useEffect, useRef, useState } from "react";
import type { SendMessage } from "../types/messages";
import { useAuthStore } from "../stores/authStore";

export function useChatScroll(
    dependency:
        | {
              pages: SendMessage[][];
              pageParams: (string | undefined)[];
          }
        | undefined,
    conversationId: number,
    isFriendTyping: boolean,
) {
    const chatRef = useRef<HTMLDivElement>(null);
    const hasScrolledInitially = useRef(false);
    const [hasNewMessages, setHasNewMessages] = useState(false);
    const currentPagesAmount = useRef(0);
    const { user } = useAuthStore();

    useEffect(() => {
        hasScrolledInitially.current = false;
    }, [conversationId]);

    // Initial scroll
    useEffect(() => {
        if (hasScrolledInitially.current) return;
        if (!chatRef.current) return;
        if (!dependency) return;

        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        hasScrolledInitially.current = true;
    }, [dependency]);

    // Scroll down on receive message if is close to bottom
    useEffect(() => {
        if (!chatRef.current || !hasScrolledInitially.current) return;

        const chat = chatRef.current;

        const distance = chat.scrollHeight - chat.scrollTop - chat.clientHeight;

        if (distance < 100) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: "smooth",
            });
            setHasNewMessages(false);
            return;
        }

        const lastPage = dependency?.pages[dependency.pages.length - 1];
        const isLastMessageYours =
            lastPage?.[lastPage?.length - 1].senderId === user?.id;
        if (isLastMessageYours) {
            return;
        }

        const hasNewPage =
            (dependency?.pages.length ?? 0) > currentPagesAmount.current;
        if (hasNewPage) {
            currentPagesAmount.current = dependency?.pages.length ?? 0;
            return;
        }

        setHasNewMessages(true);
    }, [dependency, user?.id]);

    // Scroll down on friend start typing if is close to bottom
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

    return { chatRef, hasNewMessages, setHasNewMessages };
}
