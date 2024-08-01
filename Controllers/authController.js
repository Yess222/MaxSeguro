import passport from 'passport';

const autenticarUsuario = (req,res,next) =>{
    passport.authenticate('local', (err,usuario,info) =>{
        if(err){
            return next(err);
        }
        if(!usuario){
            
            return res.render('login', {message: info.message});
        }
        req.logIn(usuario, (err) =>{
            if(err){
                return next(err);
            }

            req.session.userId = usuario.id

            console.log('Usuario autenticado', req.session.userId);
            return res.redirect('/intranet/v1/');
        });
    })(req,res,next);
};

const usuarioAutenticado = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','Por favor, inicie sesion para acceder a esta seccion');
    return res.redirect('/login/v1/');
};

const cerrarSesion = (req,res) =>{
    req.logout(req.user,err=>{
        if(err) return next(err);
    });
    req.flash('correcto','Sesion cerrada correctamente');
    return res.redirect('/login/v1/');
}

export default {
    autenticarUsuario,
    usuarioAutenticado,
    cerrarSesion
}