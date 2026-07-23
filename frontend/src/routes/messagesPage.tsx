import { LucideUserPlus2, Mic, PhoneCall, Plus, Video } from "lucide-react";
import IconButton from "../components/IconButton";
import Message from "../components/messages/Message";
import TextArea from "../components/form/TextArea";

export default function MessagesPage() {
    return (
        <>
            <header className="flex items-center p-3 justify-between">
                <span className="flex items-center gap-4">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XpLLk2nkvoWAGwt99nAkywUI5X9Th9z-qa-By9H5pe4ImI4iVZftLro&s=10"
                        alt=""
                        className="w-12 rounded-full object-cover aspect-square"
                    />
                    <span className="text-xl flex-1">Nome</span>
                </span>
                <div className="flex gap-3">
                    <IconButton>
                        <PhoneCall />
                    </IconButton>
                    <IconButton>
                        <Video />
                    </IconButton>
                    <IconButton>
                        <LucideUserPlus2 />
                    </IconButton>
                </div>
            </header>
            <hr />
            <div className="flex flex-col p-3 gap-2 flex-1 overflow-auto">
                <Message
                    name="Nome"
                    message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam est laborum, ad nisi aliquid nam dolorem aliquam minima quas sed unde vero nobis deserunt velit ut quos beatae suscipit, ipsum quae dolor, ipsam mollitia blanditiis? Tenetur perspiciatis inventore asperiores. Eum ratione iste laboriosam, aperiam minima, sapiente eaque nisi unde distinctio reprehenderit eos fuga ipsa quo cupiditate tenetur maxime perferendis pariatur! Dolorem earum exercitationem suscipit quos quia facilis dolore sit accusamus? Maxime facilis temporibus sint dolorem rerum delectus voluptatum voluptate, architecto iste minima sit totam ab nesciunt enim in vero obcaecati quo, modi consequatur, numquam ipsam voluptatem. Veritatis, accusamus? Error, placeat?"
                />
                <Message message="Lorem ipsum dolor sit amet." />
                <Message name="Nome" message="Lorem ipsum dolor sit amet." />
                <Message message="Lorem ipsum dolor sit amet." />
                <Message
                    message="Lorem ipsum dolor sit amet."
                    isOwnMessage={true}
                />
            </div>
            <hr />
            <div className="flex p-3 border m-2 rounded-full gap-2 focus-within:outline-1">
                <IconButton>
                    <Plus />
                </IconButton>
                <TextArea />
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </>
    );
}
