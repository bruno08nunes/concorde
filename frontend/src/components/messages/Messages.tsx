import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/messages";
import Message from "./Message";
import { useChatScroll } from "../../hooks/useChatScroll";
import { Loader2 } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export default function Messages({
    token,
    receiverId,
    userId,
}: {
    token: string;
    receiverId: number;
    userId: number;
}) {
    const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["messages", receiverId],
        queryFn: ({ pageParam }) => getMessages(receiverId, token, pageParam),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => {
            if (lastPage.length < 30) return undefined;

            return lastPage[0]._id;
        },
        select: (data) => ({
            pages: [...data.pages].reverse(),
            pageParams: [...data.pageParams].reverse()
        })
    });

    const chatRef = useChatScroll(data, receiverId);

    if (error) {
        return (
            <div className="flex-1 text-center p-5 text-lg">
                🛑 Erro ao buscar mensagens
            </div>
        );
    }

    return (
        <div
            className="flex flex-col p-3 gap-2 flex-1 overflow-auto custom-scrollbar"
            ref={chatRef}
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
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((message) => (
                        <Message
                            key={message._id}
                            message={message.content ?? ""}
                            isOwnMessage={message.senderId === userId}
                        />
                    ))}
                </Fragment>
            ))}
        </div>
    );
}
