import { Request, Response } from "express";
import z from "zod";
import { FileService } from "../services/file-services";
import { PrismaFileRepository } from "../repositories/prisma/prisma-file-repository";
import { mimeTypeToFileType } from "../utils/file";

const fileService = new FileService(new PrismaFileRepository());

export async function uploadFileController(req: Request, res: Response) {
    const uploadFileBodySchema = z.object({
        files: z.array(
            z.object({
                filename: z.string(),
                mimetype: z.string(),
                size: z.number(),
                originalname: z.string(),
            }),
        ),
    });
    const files = z.parse(uploadFileBodySchema, req).files.map((file) => ({
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        type: mimeTypeToFileType(file.mimetype),
        url: file.filename,
    }));

    const newFiles = await fileService.uploadFiles(files);

    return res.status(201).json({
        message: "Arquivos criados",
        success: true,
        data: newFiles,
    });
}
