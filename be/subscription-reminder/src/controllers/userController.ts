import { Request, Response, NextFunction } from "express";
import User from "../models/User/userModel";
import { getAllUsers as getAllUsersService } from "../services/userService";

/**
 * Get all users.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

/**
 * Create a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
