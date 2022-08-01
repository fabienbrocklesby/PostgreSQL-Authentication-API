import * as userController from './modules/user/user.controller.js';
import * as errorController from './helpers/error.controller.js';

export default (route) => {
  // User routes
  route.get('/api/users', userController.getUsers);
  route.get('/api/users/getuser', userController.getUser);
  route.post('/api/users/', userController.createUser);
  route.post('/api/users/verify', userController.verifyUser);
  route.post('/api/users/delete', userController.deleteUser);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
