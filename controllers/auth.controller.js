const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');

const register = catchAsync(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);
  user.password = undefined; // Do not send back password
  res.status(201).json({ status: 'success', user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUserWithEmailAndPassword(email, password);
  user.password = undefined; // Do not send back password
  res.json({ status: 'success', user, token });
});

module.exports = {
  register,
  login,
};
