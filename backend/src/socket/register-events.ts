import { Server, Socket } from "socket.io";
import { registerMessageEvents } from "./events/message-events";
import { registerConversationEvents } from "./events/conversation-events";

export function registerEvents(io: Server, socket: Socket) {
    registerConversationEvents(io, socket);
    registerMessageEvents(io, socket);
}