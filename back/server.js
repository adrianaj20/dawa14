const express = require('express');
const connectDB = require('./db');
const plantaRoutes = require('./rutas/plantaRutas');
const maquinaRoutes = require('./rutas/maquinaRutas');
const tecnicoRoutes = require('./rutas/tecnicoRutas');
const asignacionRoutes = require('./rutas/asignacionRutas');

// Conectar a la base de datos
connectDB();

// Configurar el servidor Express
const app = express();
app.use(express.json());

// Usar las rutas de usuarios
app.use('/plantas', plantaRoutes);
app.use('/maquinas', maquinaRoutes);
app.use('/tecnicos', tecnicoRoutes);
app.use('/asignaciones', asignacionRoutes);

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
