const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.json({ status: 'success', data: users });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  user.password = undefined;
  res.json({ status: 'success', data: user });
});

module.exports = {
  getUsers,
  updateUser,
};
