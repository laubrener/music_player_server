// 'api/songs'
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { crearCancion } = require('../cotrollers/auth');
const router = Router();


router.post('/new', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('artist', 'El artista es obligatorio').not().isEmpty(),
    check('albumName', 'El album es obligatorio').not().isEmpty(),
    check('albumPhoto', 'La foto es obligatoria').not().isEmpty(),
    validarCampos
], crearCancion);





module.exports = router;