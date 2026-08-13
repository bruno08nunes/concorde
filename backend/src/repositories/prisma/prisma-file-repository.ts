import { File } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";
import { IFileRepository } from "./../file-repository";

export class PrismaFileRepository implements IFileRepository {
    getFilesByIds(ids: number[]): Promise<File[]> {
        return prisma.file.findMany({ where: { id: { in: ids } } });
    }

    async uploadFiles(files: File[]): Promise<File[]> {
        const createdFiles = await Promise.all(
            files.map((file) =>
                prisma.file.create({
                    data: file,
                }),
            ),
        );

        return createdFiles;
    }
}
