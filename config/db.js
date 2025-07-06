// Archivo: config/db.js
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

let sequelize;

async function initializeDatabase() {
  try {
    // Conexión inicial sin especificar DB
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    // Crear base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Base de datos '${DB_NAME}' verificada/creada.`);

    // Conectar con Sequelize ya apuntando a la DB
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,  
      dialect: 'mysql',
      logging: false,
    });

    return sequelize;
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  getSequelize: () => sequelize,
};
