import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import { useChatScroll } from "../../hooks/useChatScroll";
import { useState } from "react";
import { useSocketEvent } from "../../hooks/useSocketEvent";
import Loader from "../Loader";
import MessagesList from "./MessagesList";
import TypingMessage from "./TypingMessage";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { ArrowDownCircle } from "lucide-react";

export default function Messages({
    token,
    receiverId,
    userId,
}: {
    token: string;
    receiverId: number;
    userId: number;
}) {
    const {
        data,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["messages", receiverId],
        queryFn: ({ pageParam }) => getMessages(receiverId, token, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => {
            if (lastPage.length < 30) return undefined;

            return lastPage[0]._id;
        },
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse(),
        }),
    });

    const messages = data?.pages.flat();
    const hasMessages = data?.pages.length === 0;

    const [isFriendTyping, setIsFriendTyping] = useState(false);

    const chatRef = useChatScroll(data, receiverId, isFriendTyping);
    const { scrollToBottom, showButton } = useScrollToBottom(chatRef);

    useSocketEvent("userTyping", () => {
        setIsFriendTyping(true);
    });
    useSocketEvent("userStopTyping", () => {
        setIsFriendTyping(false);
    });

    async function handleScroll() {
        const element = chatRef.current;

        if (!element) return;

        if (element.scrollTop <= 50 && hasNextPage && !isFetchingNextPage) {
            const oldHeight = element.scrollHeight;

            await fetchNextPage();

            requestAnimationFrame(() => {
                const newHeight = element.scrollHeight;

                element.scrollTop = newHeight - oldHeight;
            });
        }
    }

    if (error) {
        return (
            <div className="flex-1 text-center p-5 text-lg">
                🛑 Erro ao buscar mensagens
            </div>
        );
    }

    return (
        <div
            className="flex flex-col p-3 gap-2 flex-1 overflow-auto custom-scrollbar relative"
            ref={chatRef}
            onScroll={handleScroll}
        >
            {showButton && (
                <button
                    onClick={scrollToBottom}
                    className="bg-indigo-600 p-1 rounded-full cursor-pointer z-10 sticky top-0 right-auto size-9"
                >
                    <ArrowDownCircle size={28} />
                </button>
            )}
            {!hasNextPage && (
                <div className="text-center text-lg">Início da Conversa</div>
            )}
            <Loader condition={isLoading || isFetchingNextPage} />
            {hasMessages && (
                <div className="text-center text-xl">
                    Nenhuma mensagem. Inicie a conversa.
                </div>
            )}
            <MessagesList messages={messages} userId={userId} />
            {isFriendTyping && <TypingMessage />}
        </div>
    );
}
