const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true
    },
    consumerId: {
        type: String,
        required: true,
    },
    serviceCharge: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    penalty: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Paid", "Penalty", "Pending"],
        default: "Pending",
    }
});

const PaymentHistory = mongoose.model("PaymentHistory", paymentHistorySchema);

module.exports = PaymentHistory;
