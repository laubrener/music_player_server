const express = require('express');
const path = require('path');
require('dotenv').config();

// db config
require('./database/config').dbConnection();

// app express
const app = express();

// lectura y parseo del body
app.use(express.json());


// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/songs', require('./routes/songs'));


server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);
});