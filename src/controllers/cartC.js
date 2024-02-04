const Cart = require('../models/Cart')
const Product = require('../models/Product')
const mongoose = require('mongoose');

async function createCart(form, id) {
    //Desctructuramos la informacion del body

    const iD = id
    const { products } = form
    const { productId, quantity, price } = products[0];

    //Buscamos el producto en su DB
    const inventory = await Product.findOne({ _id: productId })
    //Revisamos si tenemos el stock suficiente para la cantidad requerida del cliente
    if (inventory.stock < quantity) {
        throw new Error('Insufficient stock available for the requested quantity')
    }

    //Si tenemos es el stock suficiente para la cantidad requerida del cliente creamos el carrito en la base de datos y la guardamos
    const newCart = new Cart({
        userId: iD.userId,
        products: [
            { _id: productId, quantity: quantity, price: price }
        ]
    });

    const savedCart = await newCart.save()

    return savedCart;

}


async function getUserCart(id) {
    
    const userId = id.userId

    const cart = await Cart.findOne({
        userId: userId
    })
    if (!cart) {
        throw new Error('Cart not found for the specified userId');
    }
    return cart
}

async function updateCart(form, id) {
    //Destructuramos la info pasada del handler
    const { products } = form;
    const userId = id.userId;
   
    //Revisa el producto para saber si tiene el stock requerido para lo que necesita el cliente
    const inventory = await Product.findOne({ _id: products[0].productId });
    // si no lo tiene manda un error
    if (!inventory || products.some(product => product.quantity > inventory.stock)) {
        throw new Error("Insufficient stock available for the requested quantity");
    }
    //En caso de que exista un carrito, lo buscamos por el id del usuario pasado por params
    let existingCart = await Cart.findOne({ userId: userId });
    // En caso de que no exista un carrito, creamos uno nuevo con los detalles
    if (!existingCart) {
        const newCart = new Cart({
            userId: userId,
            products: products
        });

        const savedCart = await newCart.save();
        return savedCart;
    }

    //iteramos sobre products para saber si esta el producto en ese carrito
    for (const productInfo of products) {

      
        if (!productInfo.productId) {
            console.error("Product ID is undefined:", productInfo);
            continue;
            // Saltamos a la siguiente iteración del bucle
        }

        const existingProduct = existingCart.products.find(p => p._id && p._id.toString() === productInfo.productId);

        if (existingProduct) {


            // Si el producto ya existe en el carrito, actualizo la cantidad
            existingProduct.quantity = productInfo.quantity;

        } else {
            // Si el producto no existe, lo agrega al array de productos
            existingCart.products.push({
                _id: productInfo.productId,
                quantity: productInfo.quantity,
                price: productInfo.price
            });

        }


        

    }

    // Guarda la actualización del carrito
    existingCart = await existingCart.save();



    return existingCart;
}

async function deleteCart(id) {
    //Destructuramos el id
    const userId = id.userId
    //Buscamos el carrito con el id del usuario y lo eliminamos
   const deletedCart = await Cart.findOneAndDelete({userId: userId});
   // En caso de que no exista el carrito, manda un error
    if(!deletedCart){
        throw new Error('Cart was not found for the specified userId')
    }
    return "Cart Has been Deleted"
}

async function getAllCart(){
    //Buscamos todos los carritos que existen en nuestra db
    const carts = await Cart.find();
    return carts
}




module.exports = { getUserCart, createCart, updateCart, deleteCart, getAllCart }
