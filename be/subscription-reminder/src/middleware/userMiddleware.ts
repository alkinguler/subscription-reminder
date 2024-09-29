import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

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
