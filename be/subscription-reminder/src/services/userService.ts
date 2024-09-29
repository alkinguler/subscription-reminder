import User from "../models/userModel";

export const getAllUsers = async () => {
  return await User.find();
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const newUser = new User(userData);
  return await newUser.save();
};
