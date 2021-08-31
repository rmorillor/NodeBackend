// Estructura del documento (tabla) casa publicadora en mongo
const { Schema, model } = require("mongoose");

const PublicadorSchema = Schema({
    codigo: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String,
        require: true
    },
    cantidadpublicaciones: {
        type: Number,
        require: false
    }
});

module.exports = model('Publicador', PublicadorSchema);