import { DataTypes  } from "sequelize";
import db from '../config/db.js';
import Usuarios from './Usuarios.js';
const Perfiles = db.define('perfiles',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombres:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El nombre es obligatorio'}
        }
    },
    apellidos:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El apellido es obligatorio'}
        }
    },
    telefono:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El telefono es obligatorio'}
        }
    },
    id_usuario:{    
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: Usuarios,
            key: 'id'
        }
    }
})


export default Perfiles;