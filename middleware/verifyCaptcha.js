const axios = require('axios');

module.exports = async function verifyCaptcha(req, res, next) {
  const token = req.body.mailData.token || req.body.token; // ✅ Solución
  console.log('Captcha token recibido:', token);

  if (!token) {
    return res.status(400).json({ message: 'Captcha token faltante' });
  }

  try {
    const secret = process.env.RECAPTCHA_SECRET;

    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret,
        response: token
      }
    });

    const data = response.data;

    if (!data.success || data.score < 0.5) {
      return res.status(400).json({ message: 'Captcha inválido', score: data.score });
    }

    next();
  } catch (error) {
    console.error('Error validando captcha:', error);
    res.status(500).json({ message: 'Error validando captcha' });
  }
};
