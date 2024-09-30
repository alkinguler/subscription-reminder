import { Request, Response, NextFunction } from "express";
import User from "../models/User/userModel";
import { generateToken, verifyToken } from "../services/authService";

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
  } else {
    try {
      const token = await generateToken(password, user);
      res.status(200).json({ username, token });
    } catch (error) {
      next(error);
    }
  }
};

export const checkSessionValidity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) {
    res.status(401).send("Authorization failed. No access token.");
  } else {
    try {
      const decoded = await verifyToken(token);
      res.status(200).json({ decoded });
      next();
    } catch (error) {
      next(error);
    }
  }
};
