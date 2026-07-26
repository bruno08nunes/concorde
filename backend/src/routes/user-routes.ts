import { Router } from "express";
import {
    getUserByUsername,
    loginController,
    registerController,
    searchUsersByUsername,
} from "../controllers/user-controllers";

const userRoutes = Router();

userRoutes.get("/user/:username", getUserByUsername);
userRoutes.get("/users/:username", searchUsersByUsername);
userRoutes.post("/auth/login", loginController);
userRoutes.post("/auth/register", registerController);

// userRoutes.get("/auth/me");

export default userRoutes;
