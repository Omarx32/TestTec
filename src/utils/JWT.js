const jwt = require('jsonwebtoken');
require('dotenv').config()

const { JWT_PASS } = process.env


function verifyToken(req, res, next) {
    //Obtiene el token por el header de auth
    const authHeader = req.headers.token
    
    if (authHeader){
        //Si se consigue el token lo extrae de la cadena "Bearer<Token>"
        const token = authHeader.split(" ")[1];
        //verifica la validez del token utilizando la clave secreta previamente guardada en nuestra variable de entorno
        jwt.verify(token, JWT_PASS, (err, user) => {
            if (err) res.status(400).json('Token is not vaild');
            //Si el token es valido, agrega la informacion del usuario a la solicitud
            req.user = user;
            next();
        })
    } else {
        //Si no se proporciona un token en el header o el token es invalido, devuelve un error 
        return res.status(400).json("Error: Token not valid!")
    }
}

function authorization(req, res, next) {
    //Verifica la validez del token
    verifyToken(req, res, () => {
        //Verifica si el usuario tiene los permisos necesarios para realizar esa accion
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            //Si no tiene los permisos, devuelve un error
            res.status(403).json(`You're not allowed to do that`)
        }
    })
}
function verifyAdmin(req, res, next) {
    //Verifica la validez del token
    verifyToken(req, res, () => {
        //Verifica si el usuario es admin
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(400).json(`You're not allowed to do that`)
        }
    })

}
module.exports = { verifyToken, verifyAdmin, authorization };