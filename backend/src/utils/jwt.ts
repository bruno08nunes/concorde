import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../env";

export const signJwt = (
    payload: JwtPayload,
    expiresIn: jwt.SignOptions["expiresIn"] = "1d",
    secret: string = env.JWT_SECRET,
) => {
    try {
        return jwt.sign(payload, secret, { expiresIn });
    } catch (err) {
        console.error("JWT signing failed:", err);
        return null;
    }
};

export const verifyJwt = (token: string, secret: string = env.JWT_SECRET) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
};
