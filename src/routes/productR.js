const router = require('express').Router()
const { getProductH, createProductH, updateProductH, deletedProductH } = require('../handlers/productH')
const { verifyAdmin } = require('../utils/JWT')


router.get('/get', getProductH)
router.put('/admin/:id', verifyAdmin, updateProductH)
router.post('/post', createProductH)
router.delete('/delete/:id', verifyAdmin, deletedProductH)




module.exports = router