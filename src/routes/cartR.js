const { verifyToken, authorization } = require('../utils/JWT')

const router = require('express').Router()

router.get("/find/:userId", authorization)
router.put()
router.delete()
router.post()



module.exports = router