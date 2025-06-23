const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursosController');

router.post('/', cursoController.create);
router.get('/', cursoController.findAll);

module.exports = router;
