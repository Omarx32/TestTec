require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./src/routes/routes');
const { CONNECT, PORT } = process.env
//Inicializamos el servidor, conectamos con la base de datos y le damos un puerto

mongoose.connect(`${CONNECT}`)
    .then(() => console.log("Db is working"))
    .catch((err) => { console.log(err) })

app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {
    console.log('Server is Running!')
})