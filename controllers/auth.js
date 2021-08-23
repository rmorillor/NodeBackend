const { response } = require('express'); // el response para que me de el intelisense de resp

const crearUsuario = (req, resp = response) => {

    const { email, name, password } = req.body;

    console.log(email, name, password);

    return resp.json({
        ok: true,
        msg: 'Crear usuario  /new'
    });
};

const loginUsuario = (req, resp) => {

    const { email, password } = req.body;

    console.log(email, password);

    return resp.json({
        ok: true,
        msg: 'Login de usuario /'
    });
};

const revalidarToken = (req, resp) => {
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