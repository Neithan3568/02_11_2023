// Dependencias comunes
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// Dependencias de rutas
const bootcampRoutes = require('./routes/bootcampRoutes');

// Dependencia para conexión a la base de datos
const conectDB = require('./config/db');

// Establecer archivo .env del proyecto
dotenv.config({
  path: './config/.env'
});

conectDB();

// Crear el objeto app
const app = express();

// Express para recibir datos JSON
app.use(express.json());

// Vincular las rutas de bootcamps
app.use('/api/v1/devcamp/bootcamps', bootcampRoutes);

// Definir el puerto
const PUERTO = process.env.EXPRESS_PORT || 8888;

// Iniciar el servidor
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`.bgBlue.red);
});