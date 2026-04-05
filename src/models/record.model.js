const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required for creating a record"],
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: [true, "Type is required for creating a record"],
  },
  category: {
    type: String,
    required: [true, "Category is required for creating a record"],
  },
  date: {
    type: Date,
    required: [true, "Date is required for creating a record"],
  },
  note: {
    type: String,
    maxlength: [200, "Note cannot exceed 200 characters"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const recordModel = mongoose.model("Record", recordSchema);

module.exports = recordModel;