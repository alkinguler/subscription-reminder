import { NextFunction } from "express";
import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import rateLimiterErrorKeys from "../error/rateLimiterErrorKeys";

/**
 * Rate limiter middleware for Express applications.
 * Limits the number of requests from a single IP address within a specified time window.
 *
 * @author alkinguler
 */

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 100 requests per windowMs
  message: rateLimiterErrorKeys.REQUEST_LIMIT_EXCEEDED,
  handler: (_req, res, _next, options) => {
    res.status(options.statusCode).send({ error: options.message });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Middleware to secure endpoints by verifying JWT tokens.
 * Extracts the token from the Authorization header and verifies it using the secret key.
 * If the token is valid, the request proceeds to the next middleware.
 *
 * @param req - The incoming request object
 * @param _res - The response object (unused)
 * @param next - The next middleware function
 *
 * @author alkinguler
 */
export const secureEndpoints = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
      const token = Array.isArray(authHeader)
        ? authHeader[0].split(" ")[1]
        : authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
    } else {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
