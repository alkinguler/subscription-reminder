import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { port } from "./config/app.config.ts";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import "./infrastructure/db.ts";
import { errorHandler } from "./middleware/errorMiddleware.ts";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", authRoutes);

// Error-handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
