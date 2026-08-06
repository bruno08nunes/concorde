import { Loader2 } from "lucide-react";

export default function Loader({ condition }: { condition: boolean }) {
    if (condition) {
        return (
            <div className="justify-center flex items-center h-full">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }
}
