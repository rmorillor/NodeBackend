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
            email,
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

const loginUsuario = async (req, resp = response) => {

    const { email, password } = req.body;

    try {

        // verificar si email existe
        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return resp.status(400).json({
                ok: false,
                msg: 'Credenciales no son validas'
            });
        }

        // verificar match de la contraseña
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Credenciales no son validas'
            });
        }

        // generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // respuesta del servicio
        return resp.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });

    } catch (error) {

        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
};

const revalidarToken = async (req, resp = response) => {

    const { uid } = req;

    // Leer base de datos para obtener email
    const dbUser = Usuario.findById(uid);

    // generar nuevo JWT
    const token = await generarJWT(uid, dbUser.name);

    return resp.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};