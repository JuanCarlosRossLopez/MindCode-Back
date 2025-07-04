const contactoService = require('../services/contactService');

exports.create = async (req, res) => {
  try {
    const data = req.body.mailData;
    console.log('createContacto', data);
    const contacto = await contactoService.createContacto(data);
    res.status(201).json(contacto);
  } catch (error) {
   - res.status(500).json({ message: error.message });
   console.log(error);
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
