const express = require('express');

// Crear servidor / aplicacion de express
const app = express();

// levantar app de expresss en puerto 4000
app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${4000}`)
});

// configurar rutas
// middleware de express
app.use('/api/auth', require('./routes/auth'));

