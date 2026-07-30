import { Request, Response } from "express";
import z, { success } from "zod";
import { FriendshipService } from "../services/friendship-services";
import PrismaFriendshipRepository from "../repositories/prisma/prisma-friendship-repository";

const friendshipService = new FriendshipService(
    new PrismaFriendshipRepository(),
);

export async function listPendingFriendRequests(req: Request, res: Response) {
    const userId = req.user!.id;

    const requestOrFriendship =
        await friendshipService.listPendingFriendRequests(userId);

    res.status(201).json({
        success: true,
        message: "Pedido de amizade enviado!",
        data: requestOrFriendship,
    });
}

export async function sendFriendshipRequest(req: Request, res: Response) {
    const friendshipRequestSchema = z.object({
        receiverId: z.int(),
    });

    const { receiverId } = friendshipRequestSchema.parse(req.body);

    const senderId = req.user!.id;

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

export async function declineFriendshipRequest(req: Request, res: Response) {
    const friendshipRequestSchema = z.object({
        requestId: z.int(),
    });
    
    const { requestId } = friendshipRequestSchema.parse({requestId: Number(req.params.requestId)});
    const receiverId = req.user?.id;

    const friendship = await friendshipService.declineFriendshipRequest(requestId, receiverId!);

    res.status(200).json({
        success: true,
        message: "Amizade recusada",
        data: friendship,
    });
}

export async function acceptFriendshipRequest(req: Request, res: Response) {
    const friendshipRequestSchema = z.object({
        requestId: z.int(),
    });
    
    const { requestId } = friendshipRequestSchema.parse({requestId: Number(req.params.requestId)});
    const receiverId = req.user?.id;

    const friendship = await friendshipService.createFriendship(requestId, receiverId!);

    res.status(201).json({
        success: true,
        message: "Amizade criada",
        data: friendship,
    });
}

export async function getAllFriends(req: Request, res: Response) {
    const userId = req.user!.id;

    const friends = await friendshipService.getAllFriends(userId);

    res.json({
        message: "Amigos encontrados.",
        success: true,
        data: friends,
    });
}
