import { ExtendedError, Socket } from "socket.io";
import { Unauthorized } from "../utils/errors/auth-errors";
import { verifyJwt } from "../utils/jwt";

export function authSocketMiddleware(socket: Socket, next: (err?: ExtendedError | undefined) => void) {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Unauthorized"));
    }

    try {
        const decoded = verifyJwt(token);

        if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
            throw new Unauthorized();
        }

        socket.data.user = decoded;

        next();
    } catch {
        next(new Unauthorized());
    }
}
