const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')


async function createOrder(userId) {
    // Buscar el carrito asociado al usuario en la base de datos
    const cart = await Cart.findOne({ userId: userId });
    // En caso de que no exista el carrito, retornamos un error
    if (!cart || !cart.products) {
        throw new Error("Cannot create order from an empty cart or cart not found");
    }

    // Obtiene la información detallada de cada producto en el carrito
    const detailedProducts = await Promise.all(cart.products.map(async (product) => {
        const productDetails = await Product.findById(product._id);
        //Si no se pudo obtener la informacion de un producto, devuelve un error
        if (!productDetails) {
            throw new Error(`Product not found for ID: ${product._id}`);
        }
        //En caso de que se obtenga la informacion la retorna
        return {
            productId: product._id,
            quantity: product.quantity,
            stock: productDetails.stock,
            price: productDetails.price
        };
    }));

    // Calcula el precio total sumando el precio de cada producto multiplicado por su cantidad
    const totalPrice = detailedProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    // Crea la orden con la información detallada y el precio total
    const orderData = {
        userId: cart.userId,
        cart: cart.products,
        amount: totalPrice,
      
    };
    //Registra la nueva orden
    const order = new Order (orderData)

    const savedOrder = await order.save();

    //Resta el stock de producto una vez completada la orden
    await Promise.all(detailedProducts.map(async (product) => {
        const updatedStock = product.stock - product.quantity;
        await Product.findByIdAndUpdate(product.productId, { stock: updatedStock });
    }));

    // Elimina el carrito después de crear la orden
      await Cart.findByIdAndDelete(cart._id);


    

    return savedOrder;
}

async function deleteOrders (id){

    //Buscamos la orden con el id y la eliminamos

    const order = await Order.findOneAndDelete({_id: id});
    // En caso de que esa orden no exista, devuelve un error
    if(!order){
        throw new Error('Order not found for the specified ID')
    }
    return "Cart Has been Deleted"
}

async function getAllOrders (page, limit){
    //Busca todas las ordenes en la base de datos
    const numPage = page;
    const limited = limit;
    const skip = (numPage - 1)* limited;
    const orders = await Order.find().skip(skip).limit(limited)
    return orders;
}

async function getUserOrder(id) {
    
    const userId = id.userId

    const order = await Order.findOne({
        userId: userId
    })
    if (!order) {
        throw new Error('Order not found for the specified userId');
    }
    return order;
}

module.exports = {createOrder, deleteOrders, getAllOrders, getUserOrder}