import bcrypt from 'bcrypt';
import * as userModel from './user.model.js';

const salt = await bcrypt.genSalt(10);

export const getUsers = async () => {
  const users = await userModel.getUsers();
  return users;
};

export const getUser = async (email) => {
  const user = await userModel.getUser(email);
  return user;
};

export const createUser = async ({ username, email, password }, verifyCode) => {
  password = await bcrypt.hash(password, salt);
  const user = await userModel.createUser({ username, email, password, verifyCode });
  return user;
};

export const verifyUser = async (id) => {
  await userModel.verifyUser(id);
};
