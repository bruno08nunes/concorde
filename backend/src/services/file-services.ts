import { File, FileType } from "../../generated/prisma/browser";
import { IFileRepository } from "../repositories/file-repository";

export class FileService {
    constructor(private friendshipRepository: IFileRepository) {}

    uploadFiles(
        files: {
            filename: string;
            mimeType: string;
            size: number;
            type: FileType;
        }[],
    ) {
        return this.friendshipRepository.uploadFiles(
            files.map((file) => ({ ...file, url: file.filename })),
        );
    }
}
