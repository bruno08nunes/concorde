import { useEffect, useState } from "react";

export function useScrollToBottom(
    ref: React.RefObject<HTMLDivElement | null>,
    setHasNewMessages: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        function handleScroll() {
            const distanceFromBottom =
                element!.scrollHeight -
                element!.scrollTop -
                element!.clientHeight;

            setShowButton(distanceFromBottom > 100);
            if (distanceFromBottom < 100) {
                setHasNewMessages(false);
            }
        }

        handleScroll();

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [ref, setHasNewMessages]);

    function scrollToBottom() {
        ref.current?.scrollTo({
            top: ref.current.scrollHeight,
            behavior: "smooth",
        });
    }

    return {
        showButton,
        scrollToBottom,
    };
}
