const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDatabase, getSequelize } = require('./config/db');

const { initCursoModel, getCursoModel } = require('./models/cursoModel');
const { initContactoModel } = require('./models/contactModel');
const { initUserModel } = require('./models/user.model');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await initializeDatabase();
    const sequelize = getSequelize();
    initCursoModel(sequelize);
    const Curso = getCursoModel();
    initContactoModel(sequelize, Curso);
    initUserModel(sequelize);
    await sequelize.sync();
    console.log('DB sync ok');

    // ahora que Curso NO es null, cargo rutas
    const cursosRoutes = require('./routes/cursosRoutes');
    const contactRoutes = require('./routes/contactRoutes');
    const authRoutes = require('./routes/auth.routes');
    const userRoutes = require('./routes/user.routes');
    
    app.use('/api/cursos', cursosRoutes);
    app.use('/api/contacts', contactRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);

  } catch (err) {
    console.error(err);
  }
})();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
