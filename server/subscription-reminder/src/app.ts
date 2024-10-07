import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { port } from "./config/app.config.ts";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import "./infrastructure/db.ts";
import { errorHandler } from "./middleware/errorMiddleware.ts";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Error-handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
