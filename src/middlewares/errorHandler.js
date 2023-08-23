function errorHandler(error, req, res, next) {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  res.status(statusCode).json({ status: status, message: error.message });
}

module.exports = {errorHandler};