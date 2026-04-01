const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const getAllUsers = async () => {
  return User.find();
};

const updateUserById = async (userId, updateBody) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

module.exports = {
  getAllUsers,
  updateUserById,
};
