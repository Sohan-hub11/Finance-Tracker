const Record = require("../models/record.model");
const asyncHandler = require("../utils/asyncHandler");

/**
* - get dashboard summary controller
* - GET /api/dashboard
*/
exports.getSummary = asyncHandler(async (req, res) => {
  const income = await Record.aggregate([
    { $match: { type: "income" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const expense = await Record.aggregate([
    { $match: { type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  res.json({
    totalIncome: income[0]?.total || 0,
    totalExpense: expense[0]?.total || 0,
    netBalance:
      (income[0]?.total || 0) - (expense[0]?.total || 0),
  });
});