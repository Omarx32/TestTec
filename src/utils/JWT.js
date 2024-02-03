const jwt = require('jsonwebtoken');
require('dotenv').config()

const { JWT_PASS } = process.env


function verifyToken(req, res, next) {
    const authHeader = req.headers.token
    console.log(authHeader,"soy el header")
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log(token,"hola")
        jwt.verify(token, JWT_PASS, (err, user) => {
            if (err) res.status(400).json('token is not vaild');
            req.user = user;
            next();
        })
    } else {
        return res.status(400).json("Error Token not valid!")
    }
}

function authorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json(`You're not allowed to do that`)
        }
    })
}
function verifyAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(400).json(`You're not allowed to do that`)
        }
    })

}
module.exports = { verifyToken, verifyAdmin, authorization };