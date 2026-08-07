export default function UserOnlineIcon({ isOnline }: { isOnline?: boolean }) {
    return (
        <div
            className={`size-4 absolute right-0 bottom-0 rounded-full ${isOnline ? "bg-green-400" : "bg-red-600"}`}
        ></div>
    );
}
