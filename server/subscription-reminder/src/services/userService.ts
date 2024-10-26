import { Types } from "mongoose";
import authErrorKeys from "../error/authErrorKeys";
import User from "../models/User/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Get all users from the database.
 * @returns {Promise<Array>} - A promise that resolves to an array of users.
 * @author alkinguler
 */
export const getAllUsers = async (): Promise<Array<Object>> => {
  return await User.find();
};

/**
 * Create a new user in the database.
 * @param {Object} userData - The data of the user to create.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the created user.
 * @author alkinguler
 */
export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<Object> => {
  const newUser = new User(userData);
  return await newUser.save();
};

/**
 * Get the user ID by username.
 * @param {string} username - The username of the user.
 * @returns {Promise<Types.ObjectId>} - The user ID if found, otherwise null.
 * @author alkinguler
 */
export const getUserIdByUsername = async (
  username: string
): Promise<Types.ObjectId> => {
  const user = await User.findOne({ username }).select("_id");
  if (user) {
    return user._id;
  } else {
    throw new Error(authErrorKeys.USER_NOT_FOUND);
  }
};

/**
 * Get the user ID by username.
 * @param {string} username - The username of the user.
 * @returns {Promise<Types.ObjectId>} - The user ID if found, otherwise null.
 * @author alkinguler
 */
export const getUserIdByToken = async (
  token: string
): Promise<Types.ObjectId> => {
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
  if (
    typeof decoded === "object" &&
    decoded !== null &&
    "username" in decoded
  ) {
    const user = decoded as JwtPayload;
    return await getUserIdByUsername(user.username);
  } else {
    throw new Error(authErrorKeys.USER_NOT_FOUND);
  }
};
