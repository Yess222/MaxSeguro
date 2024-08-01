import express from 'express';
import usuarioController from '../Controllers/usuarioController.js';
import authController from '../Controllers/authController.js';
import intranetController from '../Controllers/frontEnd/intranetController.js';
const router = express.Router();

router.get('/login/v1/',(req,res) =>{
    res.render('login');
})
router.post('/login/v1/',
    authController.autenticarUsuario
)
router.get('/cerrar-sesion/v1/',
    authController.usuarioAutenticado,
    authController.cerrarSesion
)

router.get('/registrar/v1/',(req,res) =>{
    res.render('register');
})
router.get('/intranet/v1/',
    authController.usuarioAutenticado,
    intranetController.intranet
)

router.get('/all-usuarios/v1/',
    usuarioController.mostrarUsuario
)
router.get('/usuario/v1/:id',
    usuarioController.mostrarUsuarioPorId
)
router.post('/registrar/v1/',
    usuarioController.registrarUsuario
);


export default () => router;