const mongoose = require('mongoose');

const asignacionSchema = new mongoose.Schema({
  maquina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maquina'
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tecnico'
  },
  turno: String,
  periodo: {
    fechaInicio: Date,
    fechaFin: Date
  }
});

module.exports = mongoose.model('Asignacion', asignacionSchema);
