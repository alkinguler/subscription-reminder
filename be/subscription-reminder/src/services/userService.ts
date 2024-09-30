import User from "../models/User/userModel";

/**
 * Get all users from the database.
 * @returns {Promise<Array>} - A promise that resolves to an array of users.
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
 */
export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<Object> => {
  const newUser = new User(userData);
  return await newUser.save();
};
