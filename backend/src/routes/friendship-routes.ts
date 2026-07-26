import { authMiddleware } from './../middlewares/auth-middleware';
import { Router } from "express";
import {
    acceptFriendshipRequest,
    getAllFriends,
    sendFriendshipRequest,
} from "../controllers/friendship-controllers";

const friendshipRoutes = Router();

friendshipRoutes.get("/friendships", authMiddleware, getAllFriends);
friendshipRoutes.post("/friendship/request", authMiddleware, sendFriendshipRequest);
friendshipRoutes.post("/friendship/request/:id/accept", acceptFriendshipRequest);

export default friendshipRoutes;
