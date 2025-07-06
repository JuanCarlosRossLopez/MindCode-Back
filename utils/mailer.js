// utils/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendConfirmationMail({ nombre_completo, correo, mensaje }) {
  const mailOptions = {
    from: `"MindCode 👨‍💻" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: 'Gracias por contactarnos en MindCode',
    html: `
      <p>Hola <strong>${nombre_completo}</strong>,</p>
      <p>Gracias por escribirnos. Hemos recibido tu mensaje:</p>
      <blockquote>${mensaje}</blockquote>
      <p>Nos pondremos en contacto contigo lo antes posible.</p>
      <br>
      <p>— El equipo de MindCode</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationMail };
