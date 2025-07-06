const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

let sequelize;

async function initializeDatabase() {
  try {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          // PlanetScale no requiere certificados, solo SSL habilitado
          minVersion: 'TLSv1.2'
        }
      },
      logging: false
    });

    await sequelize.authenticate();
    console.log('Conexión a PlanetScale establecida correctamente');
    return sequelize;
  } catch (error) {
    console.error('Error al conectar con PlanetScale:', error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  getSequelize: () => sequelize,
};
