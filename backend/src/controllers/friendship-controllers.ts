import { Request, Response } from "express";
import z from "zod";
import { FriendshipService } from "../services/friendship-services";
import PrismaFriendshipRepository from "../repositories/prisma/prisma-friendship-repository";

const friendshipService = new FriendshipService(
    new PrismaFriendshipRepository(),
);

export async function sendFriendshipRequest(req: Request, res: Response) {
    const friendshipRequestSchema = z.object({
        senderId: z.int(),
        receiverId: z.int(),
    });

    const { senderId, receiverId } = friendshipRequestSchema.parse(req.body);

    const requestOrFriendship = await friendshipService.sendRequest(
        senderId,
        receiverId,
    );

    if (requestOrFriendship.type === "friendship") {
        res.status(201).json({
            success: true,
            message: "Você fez um novo amigo!",
            data: requestOrFriendship,
        });
        return;
    }

    res.status(201).json({
        success: true,
        message: "Pedido de amizade enviado!",
        data: requestOrFriendship,
    });
}

export async function acceptFriendshipRequest(req: Request, res: Response) {
    const friendshipRequestSchema = z.object({
        user1Id: z.int(),
        user2Id: z.int(),
        requestId: z.int(),
    });

    const { user1Id, user2Id, requestId } = friendshipRequestSchema.parse(
        req.body,
    );

    const friend1Id = Math.min(user1Id, user2Id);
    const friend2Id = Math.max(user1Id, user2Id);

    const friendship = await friendshipService.createFriendship(
        friend1Id,
        friend2Id,
        requestId,
    );

    res.status(201).json({
        success: true,
        message: "Amizade criada",
        data: friendship,
    });
}
