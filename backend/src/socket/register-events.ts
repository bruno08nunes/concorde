import { Server, Socket } from "socket.io";
import { registerMessageEvents } from "./events/message-events";
import { registerConversationEvents } from "./events/conversation-events";
import { registerPresenceEvents } from "./events/presence-events";
import { registerCallEvents } from "./events/call-events";

export function registerEvents(io: Server, socket: Socket) {
    registerConversationEvents(io, socket);
    registerMessageEvents(io, socket);
    registerPresenceEvents(io, socket);
    registerCallEvents(io, socket);
}
