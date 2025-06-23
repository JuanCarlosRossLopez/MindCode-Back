// Archivo: models/cursoModel.js
const { DataTypes } = require('sequelize');

let Curso = null;

function initCursoModel(sequelize) {
  Curso = sequelize.define('Curso', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Curso;
}

module.exports = {
  initCursoModel,
  getCursoModel: () => Curso
};
