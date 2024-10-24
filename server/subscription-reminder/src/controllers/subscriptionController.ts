import { Request, Response } from "express";
import { getUserIdByUsername } from "../services/userService";
import Subscription from "../models/User/subscriptionModel";
import subscriptionErrorKeys from "../error/subscriptionErrorKeys";
import commonErrorKeys from "../error/commonErrorKeys";

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
    const userId = getUserIdByUsername(req.body.userId);
    const newSubscription = new Subscription({ ...req.body, userId });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : commonErrorKeys.UNKNOWN_ERROR,
    });
  }
};
