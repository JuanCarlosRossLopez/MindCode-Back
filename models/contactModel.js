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
    Cursos_id: {
      type: DataTypes.INTEGER,
      allowNull: true // puede ser null si no se asocia
    }
  });

  // Relaciones sin constraints físicos (PlanetScale no los permite)
  Contacto.belongsTo(Curso, {
    foreignKey: 'Cursos_id',
    constraints: false
  });

  Curso.hasMany(Contacto, {
    foreignKey: 'Cursos_id',
    constraints: false
  });

  return Contacto;
}

module.exports = {
  initContactoModel,
  getContactoModel: () => Contacto
};
