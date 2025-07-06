const userService = require('../services/user.service');

exports.register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const data = await userService.loginUser(mail, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Sesión cerrada en cliente. El token ya no se usará.' });
};

