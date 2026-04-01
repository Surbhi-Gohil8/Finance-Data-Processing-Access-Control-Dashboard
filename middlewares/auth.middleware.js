const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');

const auth = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ApiError(401, 'Please authenticate'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(payload.sub);
    if (!user || user.status === 'inactive') {
      return next(new ApiError(401, 'User no longer exists or is inactive'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid token or token has expired'));
  }
});

module.exports = auth;
