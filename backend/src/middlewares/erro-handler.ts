import { Request, Response, NextFunction } from "express";
import { env } from "../env/index";
import { ZodError } from "zod";
import ConcordeError from "../utils/error";

export interface AppError extends Error {
    status?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ConcordeError) {
        res.status(err.status).json({
            message: err.message,
            success: false,
        });
        return;
    }

    if (err instanceof ZodError) {
        res.status(400).json({
            message: "Erro de validação",
            issues: err.issues ?? [],
            success: false,
        });
        return;
    }

    if (env.NODE_ENV !== "production") {
        console.error(err);
    } else {
        // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    res.status(err.status || 500).json({
        message: "Internal Server Error",
        success: false,
        stack: env.NODE_ENV === "production" ? undefined : err.stack,
    });
};
