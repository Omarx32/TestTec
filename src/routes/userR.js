const router = require('express').Router()
const { userH, userLoginH } = require('../handlers/userH')


router.post('/create', userH)
router.post('/login', userLoginH)


module.exports = router