const PaymentHistory = require('../modals/Payment')
const mongoose = require('mongoose');

const generateOrderId = () => {
    const timestamp = new Date().getTime().toString(16);
    const randomString = Math.random().toString(16).substr(2, 5);
    return timestamp + randomString;
};

exports.createPaymentHistory = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        // Generate a unique orderId
        const orderId = generateOrderId();

        // Create a new payment history record
        const paymentHistory = new PaymentHistory({
            userId,
            orderId,
            amount,
            status: 'completed',
            paymentMethod: 'card'
        });

        // Save the payment history record to the database
        await paymentHistory.save();

        res.status(201).json({ message: 'Payment history created successfully', paymentHistory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
