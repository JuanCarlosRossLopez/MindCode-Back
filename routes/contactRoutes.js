const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactController');
const verifyCaptcha = require('../middleware/verifyCaptcha')


router.post('/', verifyCaptcha, contactoController.create);
router.get('/', contactoController.findAll);

module.exports = router;
