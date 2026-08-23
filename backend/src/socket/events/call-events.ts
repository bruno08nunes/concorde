import { Server, Socket } from "socket.io";

export function registerCallEvents(io: Server, socket: Socket) {
    socket.on("call:offer", ({ receiverId, offer, isVideoCall }) => {
        io.to(`user:${receiverId}`).emit("call:offer", {
            callerId: socket.data.user.id,
            offer,
            isVideoCall,
        });
    });

    socket.on("call:answer", ({ receiverId, answer }) => {
        io.to(`user:${receiverId}`).emit("call:answer", {
            answer,
        });
    });

    socket.on("call:ice-candidate", ({ receiverId, candidate }) => {
        io.to(`user:${receiverId}`).emit("call:ice-candidate", {
            candidate,
        });
    });

    socket.on("call:reject", ({ receiverId }) => {
        io.to(`user:${receiverId}`).emit("call:reject");
    });

    socket.on("call:end", ({ receiverId }) => {
        io.to(`user:${receiverId}`).emit("call:end");
    });
}
