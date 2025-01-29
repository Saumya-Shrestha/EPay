const ElectricBill = require("../modals/Payment");

const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const paymentHistory = await ElectricBill.find({ userId });

    res.status(200).json({ paymentHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await ElectricBill.find();
    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getPaymentHistoryBySerialAndConsumer = async (req, res) => {
  try {
    const { serialNumber, consumerId } = req.body;


    const paymentHistory = await ElectricBill.find({
      serialNumber,
      consumerId,
      status: { $in: ["Pending", "Penalty"] }
    });

    const pendingOrPenaltyMonths = paymentHistory.map(record => ({
      month: record.month
    }));

    res.status(200).json({ pendingOrPenaltyMonths });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Function to get penalty value and total amount for a specific month
const getPaymentDetailsForMonth = async (req, res) => {
  try {
    const { serialNumber, consumerId, year, month } = req.body;

    const paymentRecord = await ElectricBill.findOne({
      serialNumber,
      consumerId,
      year: parseInt(year),
      month
    });

    if (paymentRecord) {
      res.status(200).json({
        penalty: paymentRecord.penalty,
        totalAmount: paymentRecord.totalAmount
      });
    } else {
      res.status(404).json({ error: "Payment record not found for the specified month" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


module.exports = {
  getPaymentHistory,
  getPaymentHistoryBySerialAndConsumer,
  getPaymentDetailsForMonth,
  getAllPaymentHistory
};
