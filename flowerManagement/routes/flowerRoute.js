const express = require('express')
const router = express.Router()
const Controller = require('../controllers/flowerController')

router.get('/', Controller.getAllFlowers)
router.get('/:id', Controller.getFlowerById)
router.post('/', Controller.createFlower)
router.put('/:id', Controller.updateFlowerById)
router.delete('/:id', Controller.deleteFlowerById)

module.exports = router