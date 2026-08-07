import { useEffect, useState } from "react";

export function useScrollToBottom(ref: React.RefObject<HTMLDivElement | null>) {
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
        }

        handleScroll();

        element.addEventListener("scroll", handleScroll);

        return () => {
            element.removeEventListener("scroll", handleScroll);
        };
    }, [ref]);

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
