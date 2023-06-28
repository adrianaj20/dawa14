const mongoose = require('mongoose');

const tecnicoSchema = new mongoose.Schema({
  DNI: Number,
  apellido: String,
  fechaNacimiento: Date,
  telefonos: [Number],
  asignaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asignacion'
    }
  ]
});

module.exports = mongoose.model('Tecnico', tecnicoSchema);
