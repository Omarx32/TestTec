const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
    {
        
        userId :{type:String, require:true, unique:true},
        products:[{
            productID:{
                type:String,
            },
            price:{
                type:Number,
            },
            quantity:{
                type:Number,
                default: 1,
            }
        }],
      
    }, {timestamps: true})

    module.exports = mongoose.model('Cart', CartSchema)