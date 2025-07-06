const { getContactoModel } = require('../models/contactModel');
const { sendConfirmationMail } = require('../utils/mailer');

const Contacto = getContactoModel();

exports.create = async (req, res) => {
  try {
    // Si tu front manda { mailData: { … } }
const {
  nombre_completo,
  correo,
  telefono,
  mensaje,
  Cursos_id,
  terminos_aceptados
} = req.body.mailData || {};



    console.log('Datos recibidos en backend:', req.body);

    // Validación básica
    if (!nombre_completo || !correo || !telefono || !mensaje) {
  return res.status(400).json({ message: 'Todos los campos son obligatorios' });
}

    const contacto = await Contacto.create({
  nombre_completo,
  correo,
  telefono,
  mensaje,
  Cursos_id: Cursos_id || null,
  terminos_aceptados: !!terminos_aceptados
});


    // Enviar correo
    await sendConfirmationMail({
  nombre_completo,
  correo,
  mensaje
});



    res.status(201).json({ message: 'Contacto creado y correo enviado', contacto });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error al crear contacto o enviar correo',
      detalles: err.errors || err.message
    });
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
