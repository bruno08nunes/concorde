import { File } from "../../generated/prisma/browser";
import { FileCreateInput } from "../../generated/prisma/models";

export interface IFileRepository {
    uploadFiles(files: FileCreateInput[]): Promise<File[]>;
    getFilesByIds(ids: number[]): Promise<File[]>;
}
