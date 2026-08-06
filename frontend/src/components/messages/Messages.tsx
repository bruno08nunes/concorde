import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import Message from "./Message";
import { useChatScroll } from "../../hooks/useChatScroll";
import { Loader2 } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { formatDay } from "../../utils/date";
import { useState } from "react";
import { useSocketEvent } from "../../hooks/useSocketEvent";

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
    
    const [isFriendTyping, setIsFriendTyping] = useState(false);

    const chatRef = useChatScroll(data, receiverId, isFriendTyping);

    useSocketEvent("userTyping", () => {
        setIsFriendTyping(true);
    });
    useSocketEvent("userStopTyping", () => {
        setIsFriendTyping(false);
    });

    if (error) {
        return (
            <div className="flex-1 text-center p-5 text-lg">
                🛑 Erro ao buscar mensagens
            </div>
        );
    }

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

    const messages = data?.pages.flat();

    return (
        <div
            className="flex flex-col p-3 gap-2 flex-1 overflow-auto custom-scrollbar relative"
            ref={chatRef}
            onScroll={handleScroll}
        >
            {(isLoading || isFetchingNextPage) && (
                <div className="justify-center flex items-center h-full">
                    <Loader2 className="animate-spin" size={40} />
                </div>
            )}
            {data?.pages.length === 0 && (
                <div className="text-center text-xl">
                    Nenhuma mensagem. Inicie a conversa.
                </div>
            )}
            {!hasNextPage && (
                <div className="text-center text-lg">Início da Conversa</div>
            )}
            {messages?.map((message, index) => {
                const previous = messages[index - 1];

                const showDate =
                    !previous ||
                    new Date(previous.createdAt).toDateString() !==
                        new Date(message.createdAt).toDateString();

                return (
                    <Fragment key={message._id}>
                        {showDate && (
                            <div className="sticky flex justify-center my-3 top-0">
                                <span className="bg-zinc-700 px-3 py-1 rounded-full text-xs w-50 text-center">
                                    {formatDay(message.createdAt)}
                                </span>
                            </div>
                        )}

                        <Message
                            message={message.content ?? ""}
                            isOwnMessage={message.senderId === userId}
                            date={message.createdAt}
                        />
                    </Fragment>
                );
            })}
            {isFriendTyping && (
                <div className="animate-pulse">
                    <Message message=". . ." />
                </div>
            )}
        </div>
    );
}
