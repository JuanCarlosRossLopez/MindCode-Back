const cursoService = require('../services/cursosService');

exports.create = async (req, res) => {
  try {
    const curso = await cursoService.createCurso(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const cursos = await cursoService.getAllCursos();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
