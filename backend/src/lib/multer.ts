import multer from "multer";
import { InvalidFileFormatError } from "../utils/errors/file-errors";

const storageFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/files");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.trim().replaceAll(" ", "_");
        cb(null, Date.now() + fileName);
    },
});

export const allowedMimeTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",

    // Videos
    "video/mp4",
    "video/mpeg",
    "video/webm",
    "video/quicktime",

    // Audios
    "audio/mpeg",
    "audio/mp4",
    "audio/wav",
    "audio/ogg",
    "audio/webm",

    // PDF
    "application/pdf",
];
function fileFilter(
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new InvalidFileFormatError());
    }
}

export const uploadFiles = multer({
    storage: storageFiles,
    fileFilter: fileFilter,
});
