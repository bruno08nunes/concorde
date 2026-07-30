export default function NotificationSkeleton() {
    return (
        <section className="flex flex-col gap-4 p-3">
            <h1 className="text-2xl">Notificações</h1>
            <hr />
            <div className="flex items-center justify-between border p-2 rounded-2xl gap-6">
                <div className="flex-1 flex flex-col gap-3 overflow-auto">
                    <div className="flex gap-4 p-1">
                        <div className="w-12 rounded-full object-cover aspect-square bg-slate-600 animate-pulse" />
                        <div className="bg-slate-600 animate-pulse flex-1 rounded-full m-3 ml-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
