import { Router } from "express";
import { loginController, registerController } from "../controllers/user-controllers";

const userRoutes = Router();

userRoutes.post("/auth/login", loginController);
userRoutes.post("/auth/register", registerController);

// userRoutes.get("/auth/me");

export default userRoutes;