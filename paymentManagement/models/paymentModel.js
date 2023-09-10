const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    amount:{type:Number, required:true},
    createdAt:{type:Date, default:Date.now},
    status:{type:String,enum:["В обработке","Оплачено", "Отказано"],default:"В обработке"},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
})

const PaymentModel = mongoose.model('PaymentModel', paymentSchema)

module.exports = PaymentModel