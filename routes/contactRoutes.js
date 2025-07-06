const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactController');
const verifyCaptcha = require('../middleware/verifyCaptcha')
const verifyToken = require('../middleware/auth.middleware');

router.post('/', verifyCaptcha, contactoController.create);
router.get('/', verifyToken, contactoController.findAll);

module.exports = router;
