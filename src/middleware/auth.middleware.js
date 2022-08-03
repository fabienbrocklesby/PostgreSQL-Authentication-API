import jwt from 'jsonwebtoken';
import * as authModel from '../modules/auth/auth.model.js';

export default (async (request, response, next) => {
  try {
    const token = request.cookies.access_token;
    if (!token) {
      throw Object({
        name: 'badRequest',
        message: 'No token provided',
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await authModel.findByEmail(decoded.email);
    if (!user) {
      throw Object({
        name: 'badRequest',
        message: 'User email does not exist',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
});
