import { FileType } from "../../generated/prisma/enums";
import { InvalidFileFormatError } from "./errors/file-errors";

export function mimeTypeToFileType(mimeType: string): FileType {
    if (mimeType.startsWith("image/")) return FileType.IMAGE;
    if (mimeType.startsWith("video/")) return FileType.VIDEO;
    if (mimeType.startsWith("audio/")) return FileType.AUDIO;
    if (mimeType === "application/pdf") return FileType.PDF;

    throw new InvalidFileFormatError();
}
