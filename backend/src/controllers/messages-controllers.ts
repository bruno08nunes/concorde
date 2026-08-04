import { Request, Response } from "express";
import z from "zod";
import messageService from "../services/message-services";

export async function getMessages(req: Request, res: Response) {
    const getMessagesSchema = z.object({
        receiverId: z.int(),
        limit: z.coerce.number().int().min(1).max(100).default(30),
        before: z.string().optional(),
    });
    
    const { receiverId, limit, before } = getMessagesSchema.parse({
        receiverId: Number(req.params.receiverId),
        limit: req.query.limit,
        before: req.query.before,
    });

    const senderId = req.user?.id;

    const messages = await messageService.listMessages(
        receiverId,
        senderId!,
        limit,
        before,
    );

    res.json({
        message: "Mensagens encontradas.",
        success: true,
        data: messages,
    });
}
