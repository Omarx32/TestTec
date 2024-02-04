const router = require('express').Router()
const {createOrderH, getAllOrdersH, deleteOrdersH, getUserOrderH} = require('../handlers/orderH')
const { verifyAdmin, authorization } = require('../utils/JWT')

router.post('/create/:userId',createOrderH)
router.get('/getAll', verifyAdmin, getAllOrdersH)
router.get('/getUser/:userId', authorization, getUserOrderH)
router.delete('/delete/:id', verifyAdmin, deleteOrdersH)


module.exports = router