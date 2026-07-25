import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";
import { env } from "../env";
import { Unauthorized } from "../utils/errors/auth-errors";

export const authMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthorized();
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyJwt(token, env.JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
        throw new Unauthorized();
    }

    req.user = {
        id: decoded.id,
    };

    next();
};
