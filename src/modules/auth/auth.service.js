import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authModel from './auth.model.js';
import userValidator from '../../validators/user.validator.js';

export const login = async ({ email, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  const user = await authModel.findByEmail(email);

  if (!user) {
    throw Object({
      name: 'badRequest',
      message: 'User email does not exist',
    });
  }

  if (!user.verified) {
    throw Object({
      name: 'badRequest',
      message: 'User needs verifying before you log in',
    });
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw Object({
      name: 'badRequest',
      message: 'Incorrect password',
    });
  }

  const token = jwt.sign({ username: user.username, email: user.email }, process.env.SECRET_KEY);

  return token;
};
