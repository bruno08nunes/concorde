import { formatDay } from "../../utils/date";

export default function MessagesDate({ date }: { date: string }) {
    return (
        <div className="sticky flex justify-center my-3 top-0">
            <span className="bg-zinc-700 px-3 py-1 rounded-full text-xs w-50 text-center">
                {formatDay(date)}
            </span>
        </div>
    );
}
