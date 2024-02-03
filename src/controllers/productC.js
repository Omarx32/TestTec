const Product = require('../models/Product')

async function createProduct(form) {

    const input = form;

    console.log(input)

    const { name, description, price, stock, category, img } = form
    if (!name, !description, !price, !stock, !img) { throw new Error('Missing required data') }

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




async function getProduct() {
    const product = await Product.find()
    return product

}

async function getProductN(name) {
    const product = await Product.find({
        name: {
            $in: [name],
        }
    })
    return [...product]
}


async function updateProduct(form, id) {

    const { name, description, price, stock, category, img } = form
    if(!name && !description && !price && !stock && !category && !img){
        throw new Error ('No property has been sent to update')
    }

    const product = await Product.findById(id);
    if(!product){
        throw new Error ('The product has not been found')
    }
    if(name) product.name = form.name;
    if(price) product.price = form.price;
    if(description) product.description= form.description;
    if(stock) product.stock= form.stock;
    if(img) product.img = form.img

    const updatedProduct = product.save();

    return updatedProduct

}

async function deletedProduct(id){
    
    await Product.findByIdAndDelete(id);
    return "Product Has been Deleted"

}
module.exports = { getProduct, getProductN, createProduct, updateProduct, deletedProduct }

