import express from "express";
import cors from "cors";

import userRoutes from "./routes/user-routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/", userRoutes);

export default app;
