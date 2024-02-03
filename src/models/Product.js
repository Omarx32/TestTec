const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {

        name: { type: String, require: true, unique: true },
        price: { type: Number, require: true },
        img: { type: String, require: true },
        description: { type: String, require: true, },
        stock: { type: String, require: true },
        category: { type: Array }

    }, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)