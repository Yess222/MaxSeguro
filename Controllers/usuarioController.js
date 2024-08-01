import Usuarios from "../Models/Usuarios.js";
import Perfiles from "../Models/Perfiles.js";
import bcrypt from 'bcrypt';

const registrarUsuario = async (req, res, next) => {
    
    const { username, email, password, verificarPassword, nombres, apellidos, telefono } = req.body;
    
    // Verificar que el password sea igual al verificarPassword
    if (password !== verificarPassword) {
        return res.status(404).render('register', { message: 'Las contraseñas no coinciden' });
    }

    try {

        // Crear el usuario
        const usuario = await Usuarios.create({ username, email, password });

        // Crear el perfil asociado al usuario
        const perfil = await Perfiles.create({ nombres, apellidos, telefono, id_usuario: usuario.id });

        // Responder con éxito
        res.status(200).render('login');
    } catch (error) {
        res.status(404).render('register',{ mensaje: 'Error al registrar el usuario', error: error.message });
        next(error);
    }
}

const mostrarUsuario = async(req,res,next) =>{

    try{
        const usuario = await Usuarios.findAll();

        res.status(200).json(usuario)
    }catch(error){
        res.status(404).json({mensaje: 'Error al consultar los usuarios', error: error.message});
        next(error);
    }
}

const mostrarUsuarioPorId = async(req,res,next) =>{

    const idUsuario = req.params.id;

    try{

        const usuario = await Usuarios.findOne({where:{ id:idUsuario}})

        if(!usuario){
            res.status(404).json({mesaje:'Usuario no encontrado'});
            return next();
        }

        res.status(200).json(usuario);

    }catch(error){
        res.status(404).json({mensaje: 'Error al consultar el usuario por id', error: error.message});
        next(error);
    }
}

export default {
    registrarUsuario,
    mostrarUsuario,
    mostrarUsuarioPorId
}