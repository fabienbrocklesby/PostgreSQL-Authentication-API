export default (async (request, response, next) => {
  try {
    return response.json('This is a test response to test authentication middleware! 👋👤');
  } catch (error) {
    next(error);
  }
});
