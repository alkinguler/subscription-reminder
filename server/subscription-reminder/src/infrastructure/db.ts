import mongoose, { ConnectOptions } from "mongoose";
import { mongoURI } from "./config/dbConfig";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
