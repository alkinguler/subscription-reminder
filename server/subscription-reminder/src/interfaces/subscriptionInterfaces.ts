import { Types } from "mongoose";

export enum SubscriptionDuration {
  Monthly = "Monthly",
  Yearly = "Yearly",
}

export interface ISubscription {
  userId: Types.ObjectId;
  name: String;
  price: Number;
  startDate: Date;
  duration: SubscriptionDuration;
  endDate?: Date;
}
