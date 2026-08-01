import express from "express";
import cors from "cors";

import userRoutes from "./routes/user-routes";
import { errorHandler } from "./middlewares/erro-handler";
import friendshipRoutes from "./routes/friendship-routes";
import messagesRoutes from "./routes/messages";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/", userRoutes);
app.use("/", friendshipRoutes);
app.use("/", messagesRoutes);

app.use(errorHandler);

export default app;
