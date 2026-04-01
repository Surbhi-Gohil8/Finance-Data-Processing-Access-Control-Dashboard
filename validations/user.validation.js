const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updateUserRole = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    role: Joi.string().valid('viewer', 'analyst', 'admin'),
    status: Joi.string().valid('active', 'inactive'),
  })
    .min(1),
};

module.exports = {
  register,
  login,
  updateUserRole,
};
