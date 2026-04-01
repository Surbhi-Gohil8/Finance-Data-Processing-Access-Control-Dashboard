const Transaction = require('../models/transaction.model');

const getDashboardSummary = async () => {
  const [totals] = await Transaction.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalIncome: 1,
        totalExpense: 1,
        netBalance: { $subtract: ['$totalIncome', '$totalExpense'] },
      },
    },
  ]);

  const categoryTotals = await Transaction.aggregate([
    {
      $group: {
        _id: '$category',
        totalAmount: { $sum: '$amount' },
        type: { $first: '$type' }, // Assuming a category maps strongly to a specific type, though not always.
      },
    },
    { $sort: { totalAmount: -1 } },
  ]);

  const monthlyTrends = await Transaction.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
        },
        income: {
          $sum: {
            $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
          },
        },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
  ]);

  const recentTransactions = await Transaction.find().sort('-date').limit(5).populate('createdBy', 'name');

  return {
    summary: totals || { totalIncome: 0, totalExpense: 0, netBalance: 0 },
    categoryTotals,
    monthlyTrends,
    recentTransactions,
  };
};

module.exports = {
  getDashboardSummary,
};
