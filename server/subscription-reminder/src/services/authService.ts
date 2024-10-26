import { Request, Response, NextFunction } from "express";
import { Tokens } from "../interfaces/authInterfaces";
import { IUser } from "../interfaces/userInterfaces";
import jwt from "jsonwebtoken";
import User from "../models/User/userModel";
import authErrorKeys from "../error/authErrorKeys";

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
    throw new Error(authErrorKeys.UNAUTHORIZED_ACCESS);
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
    return res.status(401).json({ error: authErrorKeys.UNAUTHORIZED_ACCESS });
  }
  const refreshToken = cookies.refreshToken;
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    async (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: authErrorKeys.FORBIDDEN_ACCESS });
      }

      if (decoded) {
        const foundUser = await User.findOne({ username: decoded.username });
        if (!foundUser) {
          res.status(401).json({ error: authErrorKeys.UNAUTHORIZED_ACCESS });
        } else {
          const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.JWT_ACCESS_TOKEN_SECRET!,
            { expiresIn: "1d" }
          );
          res.status(200).json({ username: foundUser.username, accessToken });
        }
      }
    }
  );
};

/**
 * Extracts the token from the Authorization header of the HTTP request.
 * If the token is not found, throws an error.
 *
 * @param {Request} req - The incoming request object.
 * @returns {string} - The extracted JWT token.
 * @throws {Error} - Throws an error if the token is not found in the header.
 * @author alkinguler
 */

export const getTokenFromHeader = (req: Request) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader) {
    const token = Array.isArray(authHeader)
      ? authHeader[0].split(" ")[1]
      : authHeader.split(" ")[1];
    return token;
  } else {
    throw new Error(authErrorKeys.TOKEN_NOT_FOUND);
  }
};
