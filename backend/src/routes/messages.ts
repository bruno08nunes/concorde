import { getMessages } from '../controllers/messages-controllers';
import { authMiddleware } from './../middlewares/auth-middleware';
import { Router } from "express";

const messagesRoutes = Router();

messagesRoutes.get("/messages/:receiverId", authMiddleware, getMessages);

export default messagesRoutes;
