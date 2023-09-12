const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
    method: {type: String,enum:["Курьер","Самовывоз"]},
    address: {type: String, required: true},
    date: {type: String},
    cost: {type: Number, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    flowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
        required: true
    },
    status:{type: String,enum:["Не оплачен","В обработке","В пути","Доставлено"], default:"Не оплачен"}
})

const DeliveryModel = mongoose.model('DeliveryModel', deliverySchema)

module.exports = DeliveryModel