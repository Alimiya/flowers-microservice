const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    start: {type: String, required:true},
    end: {type: String, required:true},
    day: {type: String, enum:['Everyday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], default:'Everyday'}
})

const StoreModel = mongoose.model('StoreModel', storeSchema)

module.exports = StoreModel