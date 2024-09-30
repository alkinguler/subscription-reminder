import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

/**
 * Middleware to hash the user's password before saving it to the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.password || !req.body.username) {
    return next(new Error("Password and username are required"));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password.toString(), salt);
    next();
  } catch (err) {
    next(err);
  }
};
