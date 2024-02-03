const { getProduct, getProductN, createProduct, updateProduct, deletedProduct } = require('../controllers/productC')


const getProductH = async (req, res) => {
    const { name } = req.query;
    try {
        const response = name ? await getProductN(name) : await getProduct();
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const createProductH = async (req, res) => {
    try {
        const form = req.body

        const response = await createProduct(form)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: 'failed to created', error: error.message })
    }
}

const updateProductH = async (req, res) => {
    const form = req.body
    const { id } = req.params

    try {
        const response = await updateProduct(form, id)
        res.status(201).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const deletedProductH = async (req, res) => {
    const { id } = req.params
    try {
      
        const response = await deletedProduct(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { getProductH, createProductH, updateProductH, deletedProductH }