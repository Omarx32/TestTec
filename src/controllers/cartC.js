const Cart = require('../models/Cart')

async function createCart(form){
    const products = form
    const newCart =  new Cart(products)
    
    
}


async function getUserCart(id){

    const userId = id

    const cart = await Cart.findOne({
        userId: userId
    })
    return cart
}
