import { createServer } from "node:http";
import app from "./app";
import { env } from "./env";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("Um usuário se conectou.");
});

const PORT = env.PORT || 3333;

server.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
