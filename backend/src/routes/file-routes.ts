import { Router } from "express";
import { uploadFiles } from "../lib/multer";
import { uploadFileController } from "../controllers/file-controllers";

const fileRoutes = Router();

fileRoutes.post("/files", uploadFiles.array("files"), uploadFileController);

export default fileRoutes;
