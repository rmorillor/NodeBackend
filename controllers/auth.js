const { response } = require('express'); // el response para que me de el intelisense de resp

const crearUsuario = (req, resp = response) => {

    const { email, name, password } = req.body;

    console.log(email, name, password);

    return resp.json({
        ok: true,
        msg: 'Crear usuario  /new'
    });
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