import { IUser } from "../models/User/interfaces/userInterfaces";
import jwt from "jsonwebtoken";

export const generateToken = async (requestPassword: string, user: IUser) => {
  const isMatch: boolean = await user.comparePassword(requestPassword);
  if (isMatch) {
    const token: string = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "10s" }
    );
    return token;
  } else {
    throw new Error("Invalid username or password");
  }
};

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};
