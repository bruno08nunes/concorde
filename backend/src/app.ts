import express from "express";
import cors from "cors";
import path from "node:path";

import userRoutes from "./routes/user-routes";
import { errorHandler } from "./middlewares/erro-handler";
import friendshipRoutes from "./routes/friendship-routes";
import messagesRoutes from "./routes/messages";
import fileRoutes from "./routes/file-routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/", userRoutes);
app.use("/", friendshipRoutes);
app.use("/", messagesRoutes);
app.use("/", fileRoutes);

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "public", "files")),
);

app.use(errorHandler);

export default app;
