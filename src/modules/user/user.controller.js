import { v4 as uuidv4 } from 'uuid';
import * as userService from './user.service.js';
import * as emailController from '../../helpers/email.controller.js';

export const getUsers = async (request, response) => {
  const users = await userService.getUsers();
  response.json({ data: users });
};

export const getUser = async (request, response) => {
  const user = await userService.getUser(request.body.email);
  response.json({ data: user });
};

export const createUser = async (request, response) => {
  const userExists = await userService.getUser(request.body.email);
  if (userExists) {
    return response.status(400).json({ error: 'User already exists' });
  };
  const verifyCode = uuidv4();
  const user = await userService.createUser(request.body, verifyCode);
  if (user) {
    const message = `Welcome to the community ${user.username}! Please verify your email address by using this code: ${verifyCode}`;
    emailController.sendEmail('hello@fabienbrocklesby.com', 'Verify User', message);
    response.json({ data: user });
  };
};

export const verifyUser = async (request, response) => {
  const user = await userService.getUser(request.body.email);
  if (user.verifycode === request.body.verifyCode) {
    await userService.verifyUser(user.id);
    response.json({ data: user });
  } else {
    response.status(400).json({ error: 'Verification code is incorrect' });
  }
};
