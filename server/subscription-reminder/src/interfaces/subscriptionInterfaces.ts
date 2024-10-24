import { Types } from "mongoose";

export interface ISubscription {
  userId: Types.ObjectId;
  name: String;
  price: Number;
  startDate: Date;
  duration: String;
  endDate?: Date;
}
