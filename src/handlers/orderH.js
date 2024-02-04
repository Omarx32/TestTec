const { createOrder, getAllOrders, deleteOrders } = require('../controllers/orderC')
//En este archivo manejamos los errores principales y recibimos la informacion enviada por param/body, etc


const createOrderH = async (req, res) => {
    const userId = req.params.userId

    try {
        const response = await createOrder(userId)
        res.status(201).json(response)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
const getAllOrdersH = async (req, res) =>{
    const {page, limit} = req.query
    try {
        const response =await  getAllOrders(page, limit);
        res.status(200).json(response)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const deleteOrdersH = async(req, res) =>{
    const id = req.params.id
try {
    const response = await deleteOrders(id);
    res.status(200).json(response)
} catch (error) {
    res.status(401).json({ error: error.message })
}
}

const getUserOrderH = async (req, res) =>{
    const id = req.params
    try {
        const response = await getUserOrder(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    }

module.exports = { createOrderH, getAllOrdersH, deleteOrdersH, getUserOrderH}