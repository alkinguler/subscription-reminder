import { model, Schema } from "mongoose";
import { ISubscription } from "../../interfaces/subscriptionInterfaces";

const subscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, enum: ["Monthly", "Yearly"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
});

const Subscription = model<ISubscription>("Subscription", subscriptionSchema);

export default Subscription;
