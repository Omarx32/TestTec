const User = require('../models/Users')
const CryptoJS = require('crypto-js')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const { PASS_SEC, JWT_PASS } = process.env

async function userRegister(form) {

  const input = form
  const { username, password, email, phonenumber } = form
  if (!username, !password, !email) { throw new Error('Missing required data') }

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
  const input = form;

  const user = await User.findOne({ username: input.username })
  if (!user) { throw new Error('Wrong credentials!') }


  const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC)

  const passwordDecrypt = hashedPassword.toString(CryptoJS.enc.Utf8)

  if (passwordDecrypt !== input.password) {
    throw new Error('Wrong credentials!')
  }


  const accessToken = jwt.sign({
    id: user._id,
    isAdmin: user.isAdmin,
  },
    JWT_PASS,
    { expiresIn: "3d" }
  );
  const { password, ...others } = user._doc;
  const response = { ...others, accessToken }

  return response;

}
module.exports = { userRegister, userLogin };