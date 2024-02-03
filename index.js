require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./src/routes/routes');
const {  CONNECT } = process.env


mongoose.connect(`${CONNECT}`)
    .then(() => console.log("Db is working"))
    .catch((err) => { console.log(err) })

app.use(express.json())
app.use('/', router)

app.listen(5000, () => {
    console.log('Server is Running!')
})