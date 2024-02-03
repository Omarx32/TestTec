const router = require('express').Router()
const orderRoutes = require('./orderR')
const productRoutes = require('./productR')
const cartRoutes = require('./cartR')
const userRoutes = require('./userR')

router.use('/product', productRoutes)
router.use('/order', orderRoutes)
router.use('/cart', cartRoutes)
router.use('/user', userRoutes)

module.exports = router