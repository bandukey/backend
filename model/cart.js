const mongoose = require('mongoose');
const Product = require('./proteinModel');
const date = new Date().toLocaleDateString("en-US").split("/").toString()
const Booking = mongoose.model('Booking', {

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    Qty: {
        type: Number,
        default: 1
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    Date: {
        type: String,
        default: date
    }

});

module.exports = Booking