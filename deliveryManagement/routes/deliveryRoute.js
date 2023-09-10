const express = require('express')
const router = express.Router()
const Controller = require('../controllers/deliveryController')

router.get('/', Controller.getAllDeliveries)
router.get('/:id', Controller.getDeliveryById)
router.post('/', Controller.createOrder)
router.put('/send/:id', Controller.sendOrder)
router.put('/complete/:id', Controller.completeOrder)

module.exports = router