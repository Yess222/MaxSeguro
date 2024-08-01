import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url'; // Para obtener la ruta del archivo
import bodyParser from 'body-parser';
import router from './routes/index.js';
import flash from 'connect-flash';
import session from 'express-session';
import passport from './config/passport.js';
// Configuracion para tener los variables de entorno
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

// Configuracion para la base de datos
import db from './config/db.js';
// Importa el modelo
import './Models/Usuarios.js';
import './Models/Perfiles.js';
import setupAssociations from './Models/associations.js';

setupAssociations(); // Configura las asociaciones 

// la conexion a la base de datos
db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

// Definir __dirname para módulos ES
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// crear el servidor
const app = express();

// Sesion configuracion
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// Inicializar flash
app.use(flash());

// habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Ubicacion vistas
app.set('views', path.join(__dirname,'views'))

// archivos staticos
app.use(express.static('public'));

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Ruta de la App
app.use('/', router());


//Puerto
const puerto = 5000 || process.env.PORT;
app.listen(puerto,() =>{
    console.log(`El servidor esta funcionando en el puerto ${puerto}`);
})