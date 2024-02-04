const { verifyToken, authorization, verifyAdmin } = require('../utils/JWT')
const { createCartH, getUserCartH, updateCartH, deleteCartH, getAllCartH } = require('../handlers/cartH')


const router = require('express').Router()

router.get("/findAll", verifyAdmin, getAllCartH)
router.get("/find/:userId", authorization,getUserCartH)
router.put("/update/:userId", authorization,updateCartH)
router.delete("/delete/:userId",authorization, deleteCartH)
router.post("/create/:userId", authorization,createCartH)



module.exports = router