const { getContactoModel } = require('../models/contactModel');
const { sendConfirmationMail } = require('../utils/mailer');

const Contacto = getContactoModel();

exports.create = async (req, res) => {
  try {
    const contacto = await Contacto.create(req.body);

    // Enviar correo
    await sendConfirmationMail(req.body);

    res.status(201).json({ message: 'Contacto creado y correo enviado', contacto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear contacto o enviar correo' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const contactos = await Contacto.findAll();
    res.json(contactos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener contactos' });
  }
};
