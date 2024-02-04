const Product = require('../models/Product')

async function createProduct(form) {
    //Destructuramos la info pasada por parametro desde el handles
    const input = form;
    const { name, description, price, stock, category, img } = form
    
    //En caso de que falte alguna informacion del producto devolvemos un error

    if (!name, !description, !price, !stock, !img) { 
        throw new Error('Missing required data. Please provide values for name, description, price, stock, and img.') 
    }

    //Creamos el producto con sus datos y lo guardamos
    const newProduct = new Product({
        name: input.name,
        description: input.description,
        price: input.price,
        stock: input.stock,
        img: input.img
    })

    const savedProduct = newProduct.save();
    return savedProduct
}




async function getProduct(page, limit) {
    //Buscamos todos los productos en la base de datos
    const numPage = page 
    const limited = limit
    const skip = (numPage- 1) * limited
    const product = await Product.find().skip(skip).limit(limited);

    return product

}

async function getProductN(name) {
    //Buscamos todos los productos en la base de datos por nombre
    const product = await Product.find({
        name: {
            $in: [name],
        }
    })
    return [...product]
}


async function updateProduct(form, id) {
    //Destructuramos el form pasado desde el handler
    const { name, description, price, stock, category, img } = form
    //En caso de que no traiga ninguna info devolvemos un error
    if(!name && !description && !price && !stock && !category && !img){
        throw new Error ('No property has been sent to update. Please provide values for name, description, price, stock, or img.')
    }
    //Buscamos el producto por el id
    const product = await Product.findById(id);
    
    //Si el producto no fue encontrado, retornamos un error

    if(!product){
        throw new Error ('The product has not been found.')
    }
    //Revisamos que props trae el form y se las asignamos 
    if(name) product.name = form.name;
    if(price) product.price = form.price;
    if(description) product.description= form.description;
    if(stock) product.stock= form.stock;
    if(img) product.img = form.img

    // Guardamos el producto modificado
    const updatedProduct = product.save();

    return updatedProduct

}

async function deletedProduct(id){
    //Buscamos el producto por id y lo eliminamos
    await Product.findByIdAndDelete(id);
    return "Product Has been Deleted."

}
module.exports = { getProduct, getProductN, createProduct, updateProduct, deletedProduct }

