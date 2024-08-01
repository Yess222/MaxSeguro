import Usuarios from './Usuarios.js';
import Perfiles from './Perfiles.js';

const setupAssociations = () =>{
    // Un Usuario puede tener solo un Perfil
    Usuarios.hasOne(Perfiles, {foreignKey: 'id_usuario', as: 'perfil'});
    // Un Perfil pertenece a un Usuario
    Perfiles.belongsTo(Usuarios, {foreignKey: 'id_usuario', as: 'usuario'});
}

export default setupAssociations;
