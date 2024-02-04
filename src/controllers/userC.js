const User = require('../models/Users')
const CryptoJS = require('crypto-js')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const { PASS_SEC, JWT_PASS } = process.env

async function userRegister(form) {
  //Destructuramos las props
  const input = form
  const { username, password, email, phonenumber } = form
  // En caso de que falte algun dato retornamos el error
  if (!username, !password, !email) { throw new Error('Missing required data') }
  //Creamos el nuevo usuario y usamos la libreria de cryptoJs para encriptar la contraseña
  const newUser = new User({
    username: input.username,
    email: input.email,
    password: CryptoJS.AES.encrypt(
      input.password,
      PASS_SEC
    ).toString(),
  })
  const savedUser = await newUser.save();
  return savedUser
}

async function userLogin(form) {
  //Destructuramos las props
  const input = form;
  const user = await User.findOne({ username: input.username })
  
  //Verificamos que no falte ningun dato 
  if (!user) { throw new Error('Wrong credentials!') }

  //Desencriptamos la contraseña
  const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC)

  const passwordDecrypt = hashedPassword.toString(CryptoJS.enc.Utf8)
  //Verificamos que las contraseñas coincidan
  if (passwordDecrypt !== input.password) {
    throw new Error('Wrong credentials!')
  }

  //Generamos un token de acceso para el usuario
  const accessToken = jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin,
  },
    JWT_PASS,
    { expiresIn: "3d" }
  );
   // Eliminamos la contraseña del objeto del usuario para no enviarla en la respuesta

  const { password, ...others } = user._doc;

    // Exportamos la función para su uso en otras partes de la aplicación

  const response = { ...others, accessToken }

  return response;

}
module.exports = { userRegister, userLogin };