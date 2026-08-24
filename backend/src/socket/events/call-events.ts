import { Server, Socket } from "socket.io";
import PrismaUserRepository from "../../repositories/prisma/prisma-user-repository";

const userRepository = new PrismaUserRepository();

export function registerCallEvents(io: Server, socket: Socket) {
    socket.on("call:offer", async ({ receiverId, offer, isVideoCall }) => {
        const callerId = socket.data.user.id;
        const caller = await userRepository.findById(callerId);

        io.to(`user:${receiverId}`).emit("call:offer", {
            callerId: callerId,
            callerName: caller?.username,
            callerPicture: caller?.profilePicture,
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

    socket.on("call:mute", ({ receiverId, muted }) => {
        io.to(`user:${receiverId}`).emit("call:mute", { muted });
    });

    socket.on("call:camera", ({ receiverId, enabled }) => {
        io.to(`user:${receiverId}`).emit("call:camera", { enabled });
    });
}
