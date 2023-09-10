const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')

router.get('/', Controller.getAllUsers)
router.get('/orders/:id', Controller.getUserOrders)
router.get('/:id', Controller.getUserById)
router.post('/', Controller.createUser)
router.put('/:id', Controller.updateUserById)
router.delete('/:id', Controller.deleteUserById)

module.exports = router