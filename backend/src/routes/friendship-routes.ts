import { authMiddleware } from './../middlewares/auth-middleware';
import { Router } from "express";
import {
    acceptFriendshipRequest,
    sendFriendshipRequest,
} from "../controllers/friendship-controllers";

const friendshipRoutes = Router();

friendshipRoutes.post("/friendship/request", authMiddleware, sendFriendshipRequest);
friendshipRoutes.post("/friendship/request/:id/accept", acceptFriendshipRequest);

export default friendshipRoutes;
