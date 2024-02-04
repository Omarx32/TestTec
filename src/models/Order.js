const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {

        userId: { type: String, require: true, unique: true },
        cart: [{
            productID: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
            }
        }],
        amount: { type: Number, required: true },
        address: { type: Object, required: false },
        status: { type: String, default: "pending" },

    }, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)