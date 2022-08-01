export const notFound = (request, response, next) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};