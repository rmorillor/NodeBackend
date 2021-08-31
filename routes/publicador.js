// Rutas relacionadas a la casa publicadora

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearPublicador, obtenerPublicadores, obtenerPublicadorPorCodigo, buscarPublicador, editarPublicador, eliminarPublicador } = require('../controllers/publicador');

const router = Router();

router.post('/newpublisher', [
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], crearPublicador);

router.put('/editpublisher', [
    check('codigo', 'El codigo es obligatorio').not().isEmpty(), validarJWT], editarPublicador);

router.delete('/deletepublisher/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(), validarJWT], eliminarPublicador);

router.get('/getpublisher', [validarJWT], obtenerPublicadores);

router.get('/getpublisherBycode/:codigo', [
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], obtenerPublicadorPorCodigo);

router.get('/getheroeBySearch/:search', [
    check('search', 'El search es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], buscarPublicador);

module.exports = router;