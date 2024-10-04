import { Request, Response, NextFunction } from "express";

/**
 * Error handling middleware.
 * @param {any} err - The error object.
 * @param {Response} res - The response object.
 * @author alkinguler
 */
export const errorHandler = (err: any, _req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
