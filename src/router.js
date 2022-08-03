import * as userController from './modules/user/user.controller.js';
import * as errorController from './helpers/error.controller.js';

export default (route) => {
  // User routes
  route.get('/api/users', userController.getUsers);
  route.get('/api/users/getuser', userController.findByEmail);
  route.post('/api/users/create', userController.register);
  route.post('/api/users/verify', userController.verify);
  route.post('/api/users/shutdown', userController.shutdown);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
