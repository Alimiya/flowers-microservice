const express = require('express')
const router = express.Router()
const Controller = require('../controllers/storeController')
const verify = require('../../middlewares/authVerify')

router.get('/', verify, Controller.getAllStores)
router.get('/:id', verify, Controller.getStoreById)
router.post('/', verify, Controller.createStore)
router.put('/:id', verify, Controller.updateStoreById)
router.delete('/:id', verify, Controller.deleteStoreById)

module.exports = router