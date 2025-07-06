const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserModel } = require('../models/user.model');

const User = getUserModel();

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hashedPassword });
}

async function loginUser(mail, password) {
  const user = await User.findOne({ where: { mail } });
  if (!user) throw new Error('Usuario no encontrado');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({ id: user.id, rol: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return {
    token,
    user: {
      id: user.id,
      nombre: user.name,
      correo: user.mail,
      rol: user.role
    }
  };
}

async function getUsers() {
  return await User.findAll({
    attributes: { exclude: ['password'] }
  });
}

async function getUserById(id) {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  // Si incluye password, hashearla
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await user.update(data);
  return user;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');
  await user.destroy();
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
