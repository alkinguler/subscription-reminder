import { Request, Response } from "express";
import User from "../models/User/userModel";
import {
  generateTokens,
  verifyToken,
  verifyRefreshToken,
} from "../services/authService";
import authErrorKeys from "../error/authErrorKeys";

/**
 * Handles user login by verifying credentials and generating tokens.
 * Sets a refresh token as an HTTP-only cookie.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @author alkinguler
 */
export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!username || !password) {
    res.status(400).json({ error: authErrorKeys.CREDENTIALS_REQUIRED });
  }

  if (!user) {
    res.status(401).json({ error: authErrorKeys.USER_NOT_FOUND });
  } else {
    try {
      const { accessToken, refreshToken } = await generateTokens(
        password,
        user
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // accessible to web server
        secure: true, // https
        sameSite: "none", // cross-site cookie
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.status(200).json({ username, accessToken });
    } catch (error) {
      res
        .status(401)
        .json({ error: authErrorKeys.INVALID_USERNAME_OR_PASSWORD });
    }
  }
};

/**
 * Refreshes the access token using the refresh token from cookies.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A new access token if the refresh token is valid.
 * @throws Unauthorized error if no refresh token is found or invalid.
 * @author alkinguler
 */
export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    res.status(401).json({ error: authErrorKeys.UNAUTHORIZED_ACCESS });
  } else {
    verifyRefreshToken(req, res);
  }
};

/**
 * Logs out the user by clearing the refresh token cookie.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A message indicating the cookie has been cleared or a 204 status if no cookie is found.
 * @author alkinguler
 */
export const logoutController = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    res.sendStatus(204);
  } else {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ message: "Cookie cleared." });
  }
};
