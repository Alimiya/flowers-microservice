const Payment = require('../models/paymentModel')
const Delivery = require('../../deliveryManagement/models/deliveryModel')
const User = require('../../profileManagement/models/userModel')
const Flower = require('../../flowerManagement/models/flowerModel')

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}, { __v: 0})
        res.json(payments)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payments', details:error.message })
    }
}

exports.getPaymentById = async (req, res) => {
    const { id } = req.params
    try {
        const payment = await Payment.findById(id, { __v: 0 })
        if (payment) {
            res.json(payment)
        } else {
            res.status(404).json({ error: 'Payment not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Payment' })
    }
}

exports.payOrder = async (req, res) => {
    const { orderId } = req.body;
    const { userId } = req.body;
    const {paymentId} = req.body;

    try {
        const payment = await Payment.findById(paymentId);
        const order = await Delivery.findById(orderId);
        console.log(order)

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status === 'В обработке') {
            return res.status(400).json({ error: 'Order is already paid' });
        }

        if (order.userId.toString() !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const user = await User.findById(userId);
        const flower = await Flower.findById(order.flowerId);

        if (user.money < order.cost + flower.price) {
            order.status = 'Отказано';
            await order.save();
            return res.status(400).json({ error: 'Not enough funds to pay for the order' });
        }

        order.status = 'В обработке';
        await order.save();

        const newPayment = new Payment({
            userId: userId,
            amount: order.cost + flower.price,
            status: 'Оплачено'
        });
        await newPayment.save();

        user.money -= order.cost + flower.price;
        await user.save();

        res.status(200).json({ message: 'Order paid successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to pay order', details: error.message });
    }
};