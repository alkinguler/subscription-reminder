import { Request, Response } from "express";
import { getUserIdByToken } from "../services/userService";
import Subscription from "../models/User/subscriptionModel";
import subscriptionErrorKeys from "../error/subscriptionErrorKeys";
import commonErrorKeys from "../error/commonErrorKeys";
import { getTokenFromHeader } from "../services/authService";

/**
 * Create a new subscription.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const createSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = getTokenFromHeader(req);
    const userId = await getUserIdByToken(token);
    const newSubscription = new Subscription({ ...req.body, userId });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error: unknown) {
    res.status(500).json({
      error: subscriptionErrorKeys.SUBSCRIPTION_CREATION_FAILED,
      errorMsg:
        error instanceof Error ? error.message : commonErrorKeys.UNKNOWN_ERROR,
    });
  }
};
