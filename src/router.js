import * as userController from './modules/user/user.controller.js';
import * as authController from './modules/auth/auth.controller.js';
import * as errorController from './helpers/error.controller.js';
import authMiddleware from './middleware/auth.middleware.js';
import postController from './modules/posts/post.controller.js';

export default (route) => {
  // User Routes
  route.get('/api/users', userController.getUsers);
  route.get('/api/users/getuser', userController.findByEmail);
  route.post('/api/users/create', userController.register);
  route.post('/api/users/verify', userController.verify);
  route.post('/api/users/shutdown', userController.shutdown);
  route.post('/api/users/updatepassword', userController.updatePassword);

  // Auth Routes
  route.post('/api/auth/login', authController.login);

  // Post Routes
  route.get('/api/posts/', authMiddleware, postController);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
