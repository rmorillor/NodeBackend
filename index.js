const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Crear servidor / aplicacion de express
const app = express();

// levantar app de expresss en puerto 4000
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

// configurar rutas
// middleware de express

//Cors
app.use(cors());

// para leer info y parseo de lo que viene en el body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

