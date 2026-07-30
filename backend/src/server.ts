import { createServer } from "node:http";
import app from "./app";
import { env } from "./env";
import { Server } from "socket.io";
import { Unauthorized } from "./utils/errors/auth-errors";
import { verifyJwt } from "./utils/jwt";

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Unauthorized"));
    }

    try {
        const decoded = verifyJwt(token, env.JWT_SECRET);

        if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
            throw new Unauthorized();
        }

        socket.data.user = decoded;

        next();
    } catch {
        next(new Unauthorized());
    }
});

io.on("connection", (socket) => {
    console.log("Um usuário se conectou.");
});

const PORT = env.PORT || 3333;

server.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
