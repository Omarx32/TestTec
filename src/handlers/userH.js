const {userRegister, userLogin} = require('../controllers/userC')
//En este archivo manejamos los errores principales y recibimos la informacion enviada por param/body, etc

const userH = async(req, res)=>{
    try {
        const form = req.body
        
        const response = await userRegister(form)
        console.log(response)
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({message: 'Failed', error: error.message})
    }
}

const userLoginH = async(req, res)=>{
    try {
        const form = req.body;

        const response = await userLogin(form)
        console.log(response);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message: 'Failed', error: error.message})
    }
}
module.exports = {userH, userLoginH};