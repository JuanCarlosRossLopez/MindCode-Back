const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

// CRUD protegido
router.get('/', verifyToken, userController.findAllUsers);
router.get('/:id', verifyToken, userController.findById);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.removeUser);

module.exports = router;
