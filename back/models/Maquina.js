const mongoose = require('mongoose');

const maquinaSchema = new mongoose.Schema({
  numero: Number,
  marca: String,
  modelo: String,
  asignadaA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Planta'
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tecnico'
  },
  maquinaReemplazo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maquina'
  }
});

module.exports = mongoose.model('Maquina', maquinaSchema);
