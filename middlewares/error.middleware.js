const mongoose = require('mongoose');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Transform Mongoose error to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const response = {
    code: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(`${error.statusCode} - ${error.message}`);
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
