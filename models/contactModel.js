// Archivo: models/contactModel.js
const { DataTypes } = require('sequelize');

let Contacto = null;

function initContactoModel(sequelize, Curso) {
  Contacto = sequelize.define('Contacto', {
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    terminos_aceptados: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  });

  

  // Relaciones
  Contacto.belongsTo(Curso, {
    foreignKey: 'Cursos_id',
    onDelete: 'SET NULL',
  });

  Curso.hasMany(Contacto, {
    foreignKey: 'Cursos_id'
  });

  return Contacto;
}

module.exports = {
  initContactoModel,
  getContactoModel: () => Contacto
};
