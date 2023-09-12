const express = require('express')
const router = express.Router()
const Controller = require('../controllers/paymentController')
const verify = require('../../middlewares/authVerify')

router.get('/', verify, Controller.getAllPayments)
router.get('/:id', verify, Controller.getPaymentById)
router.post('/:id', verify, Controller.payOrder)

module.exports = router