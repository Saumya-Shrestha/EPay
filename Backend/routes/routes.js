const express = require("express");
const router = express.Router();
const electricBillController = require("../controllers/electricBillController");
const { getPaymentHistory, getPaymentHistoryBill, getPaymentDetailsForMonth, getPaymentHistoryBySerialAndConsumer, getAllPaymentHistory } = require("../controllers/historyController");
const authController = require("../controllers/authController");
const { calculateBill } = require("../controllers/electricBillController")
const User = require("../modals/users");
const Payment = require('../modals/Payment')

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post(
  "/generate-electric-bill",
  electricBillController.generateElectricBill
);

router.get("/history/:userId", getPaymentHistory);

router.post("/paymentBill", getPaymentHistoryBySerialAndConsumer);

router.post("/paymentMonth", getPaymentDetailsForMonth);

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/change/:userId', async (req, res) => {
  const { userId } = req.params;
  const { fullName, phoneNumber, email, bio } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.bio = bio;

    await user.save();

    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/calculate-bill", async (req, res) => {
  try {
    const { unitsConsumed, ampereCharge } = req.body;

    const { totalAmount, serviceCharge, energyCharge } = calculateBill(unitsConsumed, ampereCharge);

    res.status(200).json({ totalAmount, serviceCharge, energyCharge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/allHistory", getAllPaymentHistory)

router.post("/create-checkout-session", async (req, res) => {
  try {
    const totalPrice = req.body.totalAmount;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "NPR",
          product_data: {
            name: "Electric price",
          },
          unit_amount: totalPrice,
        },
        quantity: 1,
      }],
      success_url: `http://localhost:5173/history`,
      cancel_url: "http://localhost:5173/paybill",
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/payments/:serialNumber/:consumerId/:month', async (req, res) => {
  const { serialNumber, consumerId, month } = req.params;

  try {
    const payment = await Payment.findOneAndUpdate(
      { serialNumber, consumerId, month },
      { status: 'Paid' },
      { penalty: 0 },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    return res.status(200).json({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
