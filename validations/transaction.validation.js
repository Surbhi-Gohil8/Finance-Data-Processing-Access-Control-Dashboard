const Joi = require('joi');

const createTransaction = {
  body: Joi.object().keys({
    amount: Joi.number().required().min(0),
    type: Joi.string().required().valid('income', 'expense'),
    category: Joi.string().required(),
    date: Joi.date().iso(),
    notes: Joi.string().allow(''),
  }),
};

const getTransactions = {
  query: Joi.object().keys({
    type: Joi.string().valid('income', 'expense'),
    category: Joi.string(),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransaction = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateTransaction = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      amount: Joi.number().min(0),
      type: Joi.string().valid('income', 'expense'),
      category: Joi.string(),
      date: Joi.date().iso(),
      notes: Joi.string().allow(''),
    })
    .min(1),
};

const deleteTransaction = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
