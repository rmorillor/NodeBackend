const { response } = require('express'); // el response para que me de el intelisense de resp
const Usuario = require('../models/Usuario'); // traer el model
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, resp = response) => {

    const { email, name, password } = req.body;

    try {

        // Verificar si no existe un correo igual
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            });
        }

        // Crear instancia usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Hash de la clave o password
        const salt = bcrypt.genSaltSync(); // por defecto 10 vueltas, se puede cambiar este valor enviando la cant vueltas entre el parentesis.
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar JWT a enviar
        const token = await generarJWT(dbUser.id, name);

        // Crear usuario base de datos
        await dbUser.save();

        // Generar respuesta exitosa
        return resp.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const loginUsuario = (req, resp = response) => {

    const { email, password } = req.body;

    return resp.json({
        ok: true,
        msg: 'Login de usuario /'
    });
};

const revalidarToken = (req, resp = response) => {
    return resp.json({
        ok: true,
        msg: 'Renew'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};