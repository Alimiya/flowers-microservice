const express = require('express')
const router = express.Router()
const Controller = require('../controllers/paymentController')

router.get('/', Controller.getAllPayments)
router.get('/:id', Controller.getPaymentById)
router.post('/:id', Controller.payOrder)

module.exports = router