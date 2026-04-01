const catchAsync = require('../utils/catchAsync');
const dashboardService = require('../services/dashboard.service');

const getSummary = catchAsync(async (req, res) => {
  const data = await dashboardService.getDashboardSummary();
  res.json({ status: 'success', data });
});

module.exports = {
  getSummary,
};
