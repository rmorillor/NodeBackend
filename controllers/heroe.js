const { response } = require('express'); // el response para que me de el intelisense de resp
const Heroe = require('../models/Heroe'); // traer el model

const crearHeroe = async (req, resp = response) => {

    const { id } = req.body;

    try {

        // Verificar si no existe un usuario igual
        const heroe = await Heroe.findOne({ id });

        if (heroe) {
            return resp.status(400).json({
                ok: false,
                msg: 'El heroe ya existe'
            });
        }

        // Crear instancia heroe con el modelo
        const dbHeroe = new Heroe(req.body);

        // Crear heroe base de datos
        await dbHeroe.save();

        // Generar respuesta exitosa
        return resp.status(201).json({
            ok: true,
            _id: dbHeroe._id,
            id: dbHeroe.id,
            superhero: dbHeroe.superhero,
            publisher: dbHeroe.publisher,
            alter_ego: dbHeroe.alter_ego,
            first_appearance: dbHeroe.first_appearance,
            characters: dbHeroe.characters,
            alt_img: dbHeroe.alt_img
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const editarHeroe = async (req, resp = response) => {

    const { id } = req.body;

    try {

        // Verificar si no existe un usuario igual
        const heroe = await Heroe.findOne({ id });

        if (!heroe) {
            return resp.status(400).json({
                ok: false,
                msg: 'El heroe no existe'
            });
        }

        // Crear instancia heroe con el modelo
        const dbHeroe = new Heroe(req.body);

        // Crear heroe base de datos
        await dbHeroe.updateOne(dbHeroe);

        // Generar respuesta exitosa
        return resp.status(201).json({
            ok: true,
            _id: dbHeroe._id,
            id: dbHeroe.id,
            superhero: dbHeroe.superhero,
            publisher: dbHeroe.publisher,
            alter_ego: dbHeroe.alter_ego,
            first_appearance: dbHeroe.first_appearance,
            characters: dbHeroe.characters,
            alt_img: dbHeroe.alt_img
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const eliminarHeroe = async (req, resp = response) => {

    const _id = req.params.id;

    try {

        // Verificar si existe un usuario igual
        const heroe = await Heroe.findOne({ _id });

        if (!heroe) {
            return resp.status(400).json({
                ok: false,
                msg: 'El heroe no existe'
            });
        }

        // Crear instancia heroe con el modelo
        const dbHeroe = new Heroe(heroe);

        // Crear heroe base de datos
        await dbHeroe.deleteOne(dbHeroe);

        // Generar respuesta exitosa
        return resp.status(201).json({
            ok: true
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const obtenerHeroes = async (req, resp = response) => {

    try {

        const dbHeroe = await Heroe.find();

        // Generar respuesta exitosa
        return resp.status(201).json({
            ok: true,
            heroe: dbHeroe
        });

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const obtenerHeroePorId = async (req, resp = response) => {

    try {

        const id = req.params.id;

        const dbHeroe = await Heroe.findOne({ id });

        // Generar respuesta exitosa
        return resp.status(201).json({
            _id: dbHeroe._id,
            id: dbHeroe.id,
            superhero: dbHeroe.superhero,
            publisher: dbHeroe.publisher,
            alter_ego: dbHeroe.alter_ego,
            first_appearance: dbHeroe.first_appearance,
            characters: dbHeroe.characters,
            alt_img: dbHeroe.alt_img
        });

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const buscarHeroe = async (req, resp = response) => {

    try {

        const search = req.params.search

        const dbHeroe = await Heroe.find({ 'superhero': { '$regex': search, '$options': 'i' } });

        // Generar respuesta exitosa
        return resp.status(201).json({
            ok: true,
            heroe: dbHeroe
        });

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    crearHeroe,
    obtenerHeroes,
    obtenerHeroePorId,
    buscarHeroe,
    editarHeroe,
    eliminarHeroe
};