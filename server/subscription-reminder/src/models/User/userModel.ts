import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../../interfaces/userInterfaces";

/**
 * User schema definition.
 */
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Compare the provided password with the stored password.
 * @param {string} candidatePassword - The password to compare.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * User model.
 */
const User = model<IUser>("User", userSchema);

export default User;
