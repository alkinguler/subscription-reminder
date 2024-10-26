import { NextFunction, Request, Response } from "express";
import { getUserIdByToken } from "../services/userService";
import Subscription from "../models/User/subscriptionModel";
import subscriptionErrorKeys from "../error/subscriptionErrorKeys";
import commonErrorKeys from "../error/commonErrorKeys";
import { getTokenFromReqHeader } from "../services/authService";
import {
  deleteSubscriptionById,
  getUserSubscriptions,
} from "../services/subscriptionService";

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
    const token = await getTokenFromReqHeader(req);
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

/**
 * Retrieves all subscriptions for the authenticated user.
 * @param {Request} req - The request object containing the user's authentication token.
 * @param {Response} res - The response object to send the list of subscriptions.
 * @returns {Promise<void>} - A promise that resolves when the subscriptions are retrieved and sent.
 */
export const getSubscriptions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = await getTokenFromReqHeader(req);
    const userId = await getUserIdByToken(token);
    const fetchedSubscriptions = await getUserSubscriptions(userId);
    res.status(200).json(fetchedSubscriptions);
  } catch (error) {
    res.status(500).json({
      error: subscriptionErrorKeys.SUBSCRIPTION_FETCH_FAILED,
      errorMsg:
        error instanceof Error ? error.message : commonErrorKeys.UNKNOWN_ERROR,
    });
  }
};

/**
 * Deletes a subscription for the authenticated user.
 * @param {Request} req - The request object containing the subscription ID to be deleted.
 * @param {Response} res - The response object to confirm deletion.
 */
export const deleteSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await Subscription.findOne({
      _id: subscriptionId,
    });

    if (!subscription) {
      return next(
        res.status(404).json({
          error: subscriptionErrorKeys.SUBSCRIPTION_NOT_FOUND,
        })
      );
    }

    await deleteSubscriptionById(subscription._id);
    res.status(200).json({ message: "Subscription deleted successfully." });
    return next();
  } catch (error) {
    return next(
      res.status(500).json({
        error: subscriptionErrorKeys.SUBSCRIPTION_DELETION_FAILED,
        errorMsg:
          error instanceof Error
            ? error.message
            : commonErrorKeys.UNKNOWN_ERROR,
      })
    );
  }
};
