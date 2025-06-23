const contactoService = require('../services/contactService');

exports.create = async (req, res) => {
  try {
    const contacto = await contactoService.createContacto(req.body);
    res.status(201).json(contacto);
  } catch (error) {
   - res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const contactos = await contactoService.getAllContactos();
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
