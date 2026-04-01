const catchAsync = require('../utils/catchAsync');
const transactionService = require('../services/transaction.service');

const createTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransaction({
    ...req.body,
    createdBy: req.user._id, // Assign the authenticated User ID
  });
  res.status(201).json({ status: 'success', data: transaction });
});

const getTransactions = catchAsync(async (req, res) => {
  const filter = {
    type: req.query.type,
    category: req.query.category,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    search: req.query.search,
  };
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };
  const result = await transactionService.queryTransactions(filter, options);
  res.json({ status: 'success', data: result });
});

const getTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.params.id);
  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }
  res.json({ status: 'success', data: transaction });
});

const updateTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.updateTransactionById(req.params.id, req.body);
  res.json({ status: 'success', data: transaction });
});

const deleteTransaction = catchAsync(async (req, res) => {
  await transactionService.deleteTransactionById(req.params.id);
  res.status(204).send();
});

module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
