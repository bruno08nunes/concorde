import { Router } from "express";
import {
    getMe,
    getUserByUsername,
    loginController,
    registerController,
    searchUsersByUsername,
} from "../controllers/user-controllers";
import { authMiddleware } from "../middlewares/auth-middleware";

const userRoutes = Router();

userRoutes.get("/auth/me", authMiddleware, getMe);
userRoutes.get("/user/:username", authMiddleware, getUserByUsername);
userRoutes.get("/users/:username", searchUsersByUsername);
userRoutes.post("/auth/login", loginController);
userRoutes.post("/auth/register", registerController);

export default userRoutes;
