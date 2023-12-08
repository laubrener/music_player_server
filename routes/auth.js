// 'api/login'
const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../cotrollers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const router = Router();


router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatoria').isEmail(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatoria').isEmail(),
    validarCampos
], login);

router.get('/renew',validarJWT, renewToken);




module.exports = router;