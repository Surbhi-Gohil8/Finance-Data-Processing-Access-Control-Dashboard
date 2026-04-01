const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const createToken = (userId) => {
  const payload = { sub: userId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const registerUser = async (userData) => {
  if (await User.findOne({ email: userData.email })) {
    throw new ApiError(400, 'Email already taken');
  }
  const user = await User.create(userData);
  return { user, token: createToken(user._id) };
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  if (user.status === 'inactive') {
    throw new ApiError(401, 'Account is inactive');
  }
  return { user, token: createToken(user._id) };
};

module.exports = {
  registerUser,
  loginUserWithEmailAndPassword,
};
