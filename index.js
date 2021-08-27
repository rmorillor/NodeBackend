const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config(); // para que se vean las variables de entorno

// Crear servidor / aplicacion de express
const app = express();

// conectar a Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

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
app.use('/api/heroe', require('./routes/heroes'));

