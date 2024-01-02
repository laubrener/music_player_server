const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const Song = require('../models/song');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo inválido'
            });
        }
        const usuario = new Usuario(req.body);

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // generar mi JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Crear usuario',
            usuario,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error en el login'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Error en el login'
            });
        }
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'login',
            usuario: usuarioDB,
            token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    })
}

const crearCancion = async (req, res = response) => {

    const { title, artist } = req.body;

    try {
        const existeCancion = await Song.findOne({ title, artist });
        if (existeCancion) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe la canción'
            });
        }
        const song = new Song(req.body);

        await song.save();

        res.json({
            ok: true,
            msg: 'Crear canción',
            song
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}




module.exports = { crearUsuario, login, renewToken, crearCancion }