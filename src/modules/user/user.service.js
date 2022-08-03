import ShortUniqueId from 'short-unique-id';
import bcrypt from 'bcrypt';
import * as userModel from './user.model.js';
import * as emailController from '../../helpers/email.controller.js';
import userValidator from '../../validators/user.validator.js';

const uid = new ShortUniqueId({ length: 10 });

export const getUsers = async () => (
  userModel.getUsers());

export const findByEmail = async (email) => (
  userModel.findByEmail(email));

export const register = async ({ username, email, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  if (await userModel.findByEmail(email)) {
    throw Object({
      name: 'badRequest',
      message: 'User email already exists',
    });
  }

  const verifyCode = uid();

  const user = await userModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    verifyCode,
  });

  await emailController.sendEmail(
    user.email,
    'Verify',
    `Your Verification Code: ${verifyCode}`,
  );

  return user;
};

export const verify = async ({ email, verifyCode }) => {
  const user = await userModel.verify({
    email,
    verifyCode,
  });

  if (!user) {
    throw Object({
      name: 'badRequest',
      message: 'Invalid verification code',
    });
  };

  return user;
};

export const updatePassword = async ({ email, oldPassword, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  const userData = await userModel.findByEmail(email);

  const passwordCompare = await bcrypt.compare(oldPassword, userData.password);

  if (!passwordCompare) {
    throw Object({
      name: 'badRequest',
      message: 'Incorrect password',
    });
  };

  const user = await userModel.updatePassword({
    email,
    password: await bcrypt.hash(password, 10),
  });

  return user;
};

export const shutdown = async ({ email, password }) => {
  const userData = await userModel.findByEmail(email);

  const passwordCompare = await bcrypt.compare(password, userData.password);

  if (!passwordCompare) {
    throw Object({
      name: 'badRequest',
      message: 'Incorrect password',
    });
  };

  const user = await userModel.shutdown({
    email,
  });

  if (!user) {
    throw Object({
      name: 'badRequest',
      message: 'Invalid email or password',
    });
  }

  return user;
};
