import { NextFunction, Request, Response } from "express";
import { uploadFiles } from "../lib/multer";

export default function uploadMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    uploadFiles.array("files")(req, res, (err) => {
        if (err) {
            throw err;
        }

        next();
    });
}
