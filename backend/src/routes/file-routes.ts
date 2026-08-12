import { Router } from "express";
import { uploadFiles } from "../lib/multer";
import { uploadFile } from "../controllers/file-controllers";

const fileRoutes = Router();

fileRoutes.post("/files", uploadFiles.array("files"), uploadFile);

export default fileRoutes;
