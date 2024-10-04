import { Request, Response, NextFunction } from "express";
import { Tokens } from "../interfaces/authInterfaces";
import { IUser } from "../interfaces/userInterfaces";
import jwt from "jsonwebtoken";
import User from "../models/User/userModel";

/**
 * Generates a JWT token for the given user.
 * @param {string} requestPassword - The password provided by the user.
 * @param {IUser} user - The user object.
 * @author alkinguler
 */
export const generateTokens = async (
  requestPassword: string,
  user: IUser
): Promise<Tokens> => {
  const isMatch: boolean = await user.comparePassword(requestPassword);
  if (isMatch) {
    const accessToken: string = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_TOKEN_SECRET!,
      { expiresIn: "10s" }
    );
    const refreshToken: string = jwt.sign(
      { username: user.username },
      process.env.JWT_REFRESH_TOKEN_SECRET!,
      { expiresIn: "20s" }
    );
    return { accessToken, refreshToken };
  } else {
    throw new Error("Unauthorized access!");
  }
};

/**
 * Verifies a JWT token using the provided secret key.
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key used to verify the token.
 * @returns {Promise<jwt.JwtPayload>} - The decoded token payload.
 * @author alkinguler
 */
export const verifyToken = async (
  token: string,
  secret: string
): Promise<string | jwt.JwtPayload> => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

/**
 * Verifies a refresh token and generates a new access token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @author alkinguler
 */
export const verifyRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.status(401).json({ error: "Unauthorized access." });
  }
  const refreshToken = cookies.refreshToken;
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    async (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden access." });
      }

      if (decoded) {
        const foundUser = await User.findOne({ username: decoded.username });
        if (!foundUser) {
          res
            .status(401)
            .json({ error: "Unauthorized access. User not found." });
        } else {
          const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.JWT_ACCESS_TOKEN_SECRET!,
            { expiresIn: "10s" }
          );
          res.status(200).json({ username: foundUser.username, accessToken });
        }
      }
    }
  );
};
