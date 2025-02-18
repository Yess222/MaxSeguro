import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '.env'});

// CONEXION A LA BASE DE DATOS
const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS ?? '',{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306, // Puerto MySQL
    define:{
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default db;