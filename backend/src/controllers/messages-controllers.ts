import { Request, Response } from "express";
import z from "zod";
import messageService from "../services/message-services";

export async function getMessages(req: Request, res: Response) {
    const getMessagesSchema = z.object({
        receiverId: z.int(),
    });

    const { receiverId } = getMessagesSchema.parse(req.body);

    const senderId = req.user?.id

    const messages = await messageService.listMessages(receiverId, senderId!);

    res.json({
        message: "Mensagens encontradas.",
        success: true,
        data: messages,
    })
}
