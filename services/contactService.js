const { getContactoModel } = require('../models/contactModel');
const { getCursoModel } = require('../models/cursoModel');

const Contacto = getContactoModel();
const Curso = getCursoModel();


async function createContacto(data) {
  console.log('createContacto', data);
  const curso = await Curso.findByPk(data.Cursos_id);
  if (!curso) {
    throw new Error('Curso no encontrado');
  }

  return await Contacto.create(data);
}

async function getAllContactos() {
  return await Contacto.findAll({
    include: {
      model: Curso,
      attributes: ['id', 'nombre']
    }
  });
}

module.exports = {
  createContacto,
  getAllContactos
};
