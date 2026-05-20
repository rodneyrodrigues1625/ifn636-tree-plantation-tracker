const DashboardService = require('../services/dashboardService');

const dashboardService = new DashboardService();

const getDashboardSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getSummary(req.user.id);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard summary' });
  }
};

module.exports = {
  getDashboardSummary,
};