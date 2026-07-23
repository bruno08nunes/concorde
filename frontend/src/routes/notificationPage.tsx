import { Check, X } from "lucide-react";
import Notification from "../components/notification/NotificationItem";

export default function NotificationPage() {
    return (
        <>
            <section className="flex flex-col gap-4 p-3">
                <h1 className="text-2xl">Notificações</h1>
                <hr />
                <Notification.Root>
                    <div className="flex items-center gap-4 p-1 rounded-2xl">
                        <img
                            src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                            }
                            alt=""
                            className="w-12 rounded-full object-cover aspect-square"
                        />
                        <span className="text-justify">Lorem ipsum dolor sit amet consectetur.</span>
                    </div>
                    <Notification.Buttons>
                        <button className="border p-1 cursor-pointer rounded-lg hover:outline-1">
                            <X />
                        </button>
                        <button className="border p-1 cursor-pointer rounded-lg hover:outline-1">
                            <Check />
                        </button>
                    </Notification.Buttons>
                </Notification.Root>
                <Notification.Root>
                    <div className="flex items-center gap-4 p-1 rounded-2xl">
                        <img
                            src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                            }
                            alt=""
                            className="w-12 rounded-full object-cover aspect-square"
                        />
                        <span className="text-justify">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempora reiciendis cumque ratione reprehenderit quisquam a, sequi voluptatibus possimus earum.</span>
                    </div>
                </Notification.Root>
                <Notification.Root>
                    <div className="items-center gap-4 p-1 rounded-2xl">
                        <h2 className="text-xl">Teste</h2>
                        <span className="text-justify">Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempora reiciendis cumque ratione reprehenderit quisquam a, sequi voluptatibus possimus earum.</span>
                    </div>
                </Notification.Root>
            </section>
        </>
    );
}
