// Rutas relacionadas a la autenticacion

const { Router } = require('express');

const router = Router();

// Crear un nuevo usuario
router.post('/new', (req, resp) => {
    return resp.json({
        ok: true,
        msg: 'Crear usuario  /new'
    });
});

// Login de usuario
router.post('/', (req, resp) => {
    return resp.json({
        ok: true,
        msg: 'Login de usuario /'
    });
});

// Validar y revalidar token
router.get('/renew', (req, resp) => {
    return resp.json({
        ok: true,
        msg: 'Renew'
    });
});

module.exports = router;