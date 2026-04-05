const Record = require("../models/record.model");
const asyncHandler = require("../utils/asyncHandler");


/**
* - create record controller
* - POST /api/records
*/
exports.createRecord = asyncHandler(async (req, res) => {
  const record = await Record.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.json(record);
});


/**
* - admin & analyst record listing controller
* - GET /api/records
*/
exports.getRecords = asyncHandler(async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 5, 50);
  const skip = (page - 1) * limit;

  if (page < 1) {
    const error = new Error("Page must be >= 1");
    error.statusCode = 400;
    throw error;
  }

  // Filters
  const {
    type,
    category,
    search,
    startDate,
    endDate,
    minAmount,
    maxAmount,
  } = req.query;

  let filter = { isDeleted: false };

  // Type filter
  if (type) filter.type = type;

  // Category filter
  if (category) filter.category = category;

  // Search (case-insensitive)
  if (search) {
    filter.note = { $regex: search, $options: "i" };
  }

  // Date range
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  // Amount range
  if (minAmount || maxAmount) {
    filter.amount = {};
    if (minAmount) filter.amount.$gte = Number(minAmount);
    if (maxAmount) filter.amount.$lte = Number(maxAmount);
  }

  // Total count
  const totalRecords = await Record.countDocuments(filter);

  // Data
  const records = await Record.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  // If search is present, we want to search in both note and category fields.  
  if (search) {
  filter.$or = [
    { note: { $regex: search, $options: "i" } },
    { category: { $regex: search, $options: "i" } }
  ];
  }

  res.json({
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    hasNextPage: page * limit < totalRecords,
    hasPrevPage: page > 1,
    records,
  });
});


/**
* - admin record update controller
* - PUT /api/records/:id
*/
exports.updateRecord = asyncHandler(async (req, res) => {
  const record = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(record);
});


/**
* - admin record delete controller
* - DELETE /api/records/:id
*/
exports.deleteRecord = asyncHandler(async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});