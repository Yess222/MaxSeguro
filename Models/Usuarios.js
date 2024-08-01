import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuarios = db.define('usuarios',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El nombre de usuario es obligatorio'},
            isUnique: async function (value, next) {
                try {
                    const usuario = await Usuarios.findOne({ where: { username: value } });
                    if (usuario && this.id !== usuario.id) {
                        return next('El nombre de usuario ya está en uso');
                    }
                    return next();
                } catch (error) {
                    return next(error);
                }
            }
        }
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El correo es obligatorio'},
            isEmail: {msg: 'Agrega un correo valido'},
            isUnique: async function (value, next) {
                try {
                    const usuario = await Usuarios.findOne({ where: { email: value } });
                    if (usuario && this.id !== usuario.id) {
                        return next('El nombre de email ya está en uso');
                    }
                    return next();
                } catch (error) {
                    return next(error);
                }
            }
        }
    },
    password:{
        type: DataTypes.STRING(60),
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El password es obligatorio'},
            len: {
                args: [8,60],
                msg: 'El password debe tener al menos 8 caracteres'
            }
        }
    },
    activo:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tokenPassword: DataTypes.STRING,
    expiraToken: DataTypes.DATE,
    },
    {
    hooks:{
            // Metodo para ocultar password
            beforeCreate(usuario){
                usuario.password = Usuarios.prototype.hashPassword(usuario.password);
            }
        }
    });


// Metodo para hash password
Usuarios.prototype.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

// Metodo para validar password
Usuarios.prototype.validarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}



export default Usuarios;