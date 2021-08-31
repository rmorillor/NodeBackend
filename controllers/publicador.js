const { response } = require('express');
const Publicador = require('../models/Publicador');

const crearPublicador = async (req, resp = response) => {

    const { codigo } = req.body;

    try {

        const publicador = await Publicador.findOne({ codigo });

        if (publicador) {
            return resp.status(400).json({
                ok: false,
                msg: 'La casa publicadora ya existe'
            });
        }

        const dbPublicador = new Publicador(req.body);

        await dbPublicador.save();

        return resp.status(201).json({
            ok: true,
            publicador: dbPublicador
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const editarPublicador = async (req, resp = response) => {

    const { codigo } = req.body;

    try {

        const publicador = await Publicador.findOne({ codigo });

        if (!publicador) {
            return resp.status(400).json({
                ok: false,
                msg: 'La casa publicadora no existe'
            });
        }

        const dbPublicador = new Publicador(req.body);

        await dbPublicador.updateOne(dbPublicador);

        return resp.status(201).json({
            ok: true,
            _id: dbPublicador._id,
            codigo: dbPublicador.codigo,
            descripcion: dbPublicador.descripcion,
            cantidadpublicaciones: dbPublicador.cantidadpublicaciones
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const eliminarPublicador = async (req, resp = response) => {

    const _id = req.params.id;

    try {

        const publicador = await Publicador.findOne({ _id });

        if (!publicador) {
            return resp.status(400).json({
                ok: false,
                msg: 'La casa publicadora no existe'
            });
        }

        const dbPublicador = new Publicador(publicador);

        await dbPublicador.deleteOne(dbPublicador);

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

const obtenerPublicadores = async (req, resp = response) => {

    try {

        const dbPublicador = await Publicador.find();

        return resp.status(201).json({
            ok: true,
            publicador: dbPublicador
        });

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const obtenerPublicadorPorCodigo = async (req, resp = response) => {

    try {

        const codigo = req.params.codigo;

        const dbPublicador = await Publicador.findOne({ codigo });

        return resp.status(201).json({
            _id: dbPublicador._id,
            codigo: dbPublicador.codigo,
            descripcion: dbPublicador.descripcion,
            cantidadpublicaciones: dbPublicador.cantidadpublicaciones
        });

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const buscarPublicador = async (req, resp = response) => {

    try {

        const search = req.params.search

        const dbPublicador = await Publicador.find({ 'descripcion': { '$regex': search, '$options': 'i' } });

        return resp.status(201).json({
            ok: true,
            publicador: dbPublicador
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
    crearPublicador,
    obtenerPublicadores,
    obtenerPublicadorPorCodigo,
    buscarPublicador,
    editarPublicador,
    eliminarPublicador
};