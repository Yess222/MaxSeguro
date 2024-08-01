import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import Usuarios from '../Models/Usuarios.js';

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
    },
    async(email,password,done)=>{
        try{
            const usuario = await Usuarios.findOne({where:{email:email}});
            
            if(!usuario){
                return done(null,false,{message:'Usuario no encontrado'});
            }

            const verificarPassword = await usuario.validarPassword(password);

            if(!verificarPassword){
                return done(null, false, {message:'Password incorrecto'});
            }

            return done(null, usuario);
        }catch(error){
            return done(error);
        }
    }
));

passport.serializeUser((usuario, done) =>{
    done(null,usuario.id);
});

passport.deserializeUser(async(id,done)=>{
    try{
        const usuario = await Usuarios.findByPk(id);
        done(null,usuario);
    }catch(error){
        done(error);
    }
});

export default passport;