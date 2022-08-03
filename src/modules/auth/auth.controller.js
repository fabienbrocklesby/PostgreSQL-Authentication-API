import * as authService from './auth.service.js';

export const login = async (request, response, next) => {
  try {
    const token = await authService.login(request.body);
    if (token) {
      return response
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊👌" });
    }
  } catch (error) {
    next(error);
  };
};
