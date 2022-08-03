import * as userService from './user.service.js';

export const getUsers = async (request, response, next) => {
  try {
    response.json({ data: await userService.getUsers() });
  } catch (error) {
    next(error);
  }
};

export const findByEmail = async (request, response, next) => {
  try {
    response.json({ data: await userService.findByEmail(request.body.email) });
  } catch (error) {
    next(error);
  };
};

export const register = async (request, response, next) => {
  try {
    response.json({ data: await userService.register(request.body) });
  } catch (error) {
    next(error);
  };
};

export const verify = async (request, response, next) => {
  try {
    response.json({ data: await userService.verify(request.body) });
  } catch (error) {
    next(error);
  };
};

export const shutdown = async (request, response, next) => {
  try {
    response.json({ data: await userService.shutdown(request.body) });
  } catch (error) {
    next(error);
  }
};
