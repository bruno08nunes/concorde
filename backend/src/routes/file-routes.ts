import { Router } from "express";
import { uploadFiles } from "../lib/multer";
import { uploadFileController } from "../controllers/file-controllers";
import uploadMiddleware from "../middlewares/upload-middleware";

const fileRoutes = Router();

fileRoutes.post("/files", uploadMiddleware, uploadFileController);

export default fileRoutes;
