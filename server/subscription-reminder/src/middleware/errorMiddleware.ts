import { Request, Response, NextFunction } from "express";

/**
 * Error handling middleware.
 * @param {any} err - The error object.
 * @param {Request} _req - The request object (unused).
 * @param {Response} res - The response object.
 * @param {NextFunction} _next - The next middleware function (unused).
 * @author alkinguler
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};
