import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express()

app.use(cookieParser());
app.use(helmet({
    crossOriginResourcePolicy: false,
})
);
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", //frontend URL
    credentials: true // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.json({ status: "OK" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

//global Error Handler
app.use(errorHandler);

export default app;