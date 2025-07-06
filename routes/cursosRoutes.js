const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursosController');
const verifyToken = require('../middleware/auth.middleware');


router.post('/', verifyToken, cursoController.create);
router.get('/', cursoController.findAll);

module.exports = router;
