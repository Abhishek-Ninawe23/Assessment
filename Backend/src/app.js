import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express()

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.json({ status: "OK" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

//global Error Handler
app.use(errorHandler);

export default app;