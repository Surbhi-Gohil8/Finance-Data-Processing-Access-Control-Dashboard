const Transaction = require('../models/transaction.model');
const ApiError = require('../utils/ApiError');

const createTransaction = async (transactionBody) => {
  return Transaction.create(transactionBody);
};

const queryTransactions = async (filter, options) => {
  const query = {};

  if (filter.type) query.type = filter.type;
  if (filter.category) query.category = filter.category;
  
  if (filter.startDate || filter.endDate) {
    query.date = {};
    if (filter.startDate) query.date.$gte = new Date(filter.startDate);
    if (filter.endDate) query.date.$lte = new Date(filter.endDate);
  }

  if (filter.search) {
    query.$or = [
      { category: { $regex: filter.search, $options: 'i' } },
      { notes: { $regex: filter.search, $options: 'i' } }
    ];
  }

  const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const skip = (page - 1) * limit;

  const sort = options.sortBy ? options.sortBy.split(',').join(' ') : '-date';

  const transactions = await Transaction.find(query).sort(sort).skip(skip).limit(limit).populate('createdBy', 'name email');
  const totalResults = await Transaction.countDocuments(query);
  const totalPages = Math.ceil(totalResults / limit);

  return {
    results: transactions,
    page,
    limit,
    totalPages,
    totalResults,
  };
};

const getTransactionById = async (id) => {
  return Transaction.findById(id).populate('createdBy', 'name email');
};

const updateTransactionById = async (transactionId, updateBody) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }
  Object.assign(transaction, updateBody);
  await transaction.save();
  return transaction;
};

const deleteTransactionById = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }
  // Soft delete
  transaction.isDeleted = true;
  await transaction.save();
  return transaction;
};

module.exports = {
  createTransaction,
  queryTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
