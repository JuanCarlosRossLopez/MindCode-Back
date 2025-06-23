const { getCursoModel } = require('../models/cursoModel');
const Curso = getCursoModel();

async function createCurso(data) {
  return await Curso.create(data);
}

async function getAllCursos() {
  return await Curso.findAll();
}

module.exports = {
  createCurso,
  getAllCursos
};
