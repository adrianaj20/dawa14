const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
  color: String,
  superficie: Number,
  procesos:
    {
      nombre: String,
      gradoDeComplejidad: Number
    },
  maquinas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Maquina'
    }
  ]
});

module.exports = mongoose.model('Planta', plantaSchema);
