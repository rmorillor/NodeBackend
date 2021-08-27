// Estructura del documento (tabla) heroe en mongo
const { Schema, model } = require("mongoose");

const HeroeSchema = Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    superhero: {
        type: String,
        require: true
    },
    publisher: {
        type: String,
        require: true
    },
    alter_ego: {
        type: String,
        require: true
    },
    first_appearance: {
        type: String,
        require: false
    },
    characters: {
        type: String,
        require: true
    },
    alt_img: {
        type: String,
        require: false
    }
});

module.exports = model('Heroe', HeroeSchema);