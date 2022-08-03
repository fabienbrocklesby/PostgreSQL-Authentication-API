import * as authService from './auth.service.js';

export const login = async (request, response, next) => {
  try {
    response.json({ data: await authService.login(request.body) });
  } catch (error) {
    next(error);
  };
};
