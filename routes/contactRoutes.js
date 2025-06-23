const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactController');

router.post('/', contactoController.create);
router.get('/', contactoController.findAll);

module.exports = router;
