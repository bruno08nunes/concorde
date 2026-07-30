import { authMiddleware } from './../middlewares/auth-middleware';
import { Router } from "express";
import {
    acceptFriendshipRequest,
    declineFriendshipRequest,
    getAllFriends,
    listPendingFriendRequests,
    sendFriendshipRequest,
} from "../controllers/friendship-controllers";

const friendshipRoutes = Router();

friendshipRoutes.get("/friendships", authMiddleware, getAllFriends);
friendshipRoutes.get("/friendship/requests", authMiddleware, listPendingFriendRequests);
friendshipRoutes.post("/friendship/request", authMiddleware, sendFriendshipRequest);
friendshipRoutes.post("/friendship/request/:requestId/accept", authMiddleware, acceptFriendshipRequest);
friendshipRoutes.patch("/friendship/request/:requestId/decline", authMiddleware, declineFriendshipRequest);

export default friendshipRoutes;
