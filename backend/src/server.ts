import { createServer } from "node:http";
import app from "./app";
import { env } from "./env";
import { Server } from "socket.io";
import { configureSocket } from "./socket";

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

configureSocket(io);

const PORT = env.PORT || 3333;

server.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
});
