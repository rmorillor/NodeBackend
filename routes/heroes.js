// Rutas relacionadas a los heroes

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearHeroe, obtenerHeroes, obtenerHeroePorId, buscarHeroe } = require('../controllers/heroe');

const router = Router();

// Crear un nuevo heroe
router.post('/newheroe', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('superhero', 'El super heroe es obligatorio').not().isEmpty(),
    check('publisher', 'La casa publicadora es obligatoria').not().isEmpty(),
    check('alter_ego', 'El alter ego es obligatorio').not().isEmpty(),
    check('characters', 'El caracter es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], crearHeroe);

// Obtener listado de heroes
router.get('/getheroes', [validarJWT], obtenerHeroes);

// Obtener heroe por id
router.get('/getheroeById/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], obtenerHeroePorId);

// Buscar heroe
router.get('/getheroeBySearch/:search', [
    check('search', 'El search es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], buscarHeroe);

module.exports = router;