const express = require('express')
const router = express.Router()
const Controller = require('../controllers/storeController')

router.get('/', Controller.getAllStores)
router.get('/:id', Controller.getStoreById)
router.post('/', Controller.createStore)
router.put('/:id', Controller.updateStoreById)
router.delete('/:id', Controller.deleteStoreById)

module.exports = router