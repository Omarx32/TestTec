const { createCart, getUserCart, updateCart, deleteCart, getAllCart} = require('../controllers/cartC')
//En este archivo manejamos los errores principales y recibimos la informacion enviada por param/body, etc
const createCartH = async (req, res) => {
    const id = req.params
    const form = req.body
    try {
        const response = await createCart(form, id)
        
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getUserCartH = async (req, res) =>{
    const id = req.params
    try {
        const response = await getUserCart(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    }

const updateCartH = async (req, res) =>{
    const id= req.params
   
    const form = req.body
   
    try {
        const response = await updateCart( form, id);
        
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}
const deleteCartH = async (req, res)=> {
    const id = req.params
    try {
        const response = await deleteCart(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

const getAllCartH = async (req, res) =>{
    try {
        const response = await getAllCart();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { createCartH, getUserCartH, updateCartH, deleteCartH, getAllCartH}