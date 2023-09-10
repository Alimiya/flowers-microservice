const mongoose = require('mongoose')

const flowerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StoreModel',
        required: true
    }
})

const FlowerModel = mongoose.model('FlowerModel', flowerSchema)

module.exports = FlowerModel