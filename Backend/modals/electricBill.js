const mongoose = require("mongoose");

const electricBillSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  unitsConsumed: {
    type: Number,
    required: true,
  },
  ampereCharge: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const ElectricBill = mongoose.model("ElectricBill", electricBillSchema);

module.exports = ElectricBill;
