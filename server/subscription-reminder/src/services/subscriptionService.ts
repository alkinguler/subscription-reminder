import { Types } from "mongoose";
import Subscription from "../models/User/subscriptionModel";

/**
 * Retrieves all subscriptions for a given user.
 * @param {Types.ObjectId} userId - The ID of the user whose subscriptions will be retrieved.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of subscription objects.
 * @author alkinguler
 */
export const getUserSubscriptions = async (
  userId: Types.ObjectId
): Promise<Array<Object>> => {
  return await Subscription.find({ userId: userId });
};

/**
 * Deletes a subscription by its ID.
 * @param {Types.ObjectId} subscriptionId - The ID of the subscription to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the subscription is deleted.
 * @author alkinguler
 */
export const deleteSubscriptionById = async (
  subscriptionId: Types.ObjectId
): Promise<void> => {
  await Subscription.findByIdAndDelete(subscriptionId);
};
