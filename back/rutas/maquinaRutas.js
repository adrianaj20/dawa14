const express = require('express');
const router = express.Router();
const Maquina = require('../models/Maquina');
const Planta = require('../models/Planta');
const Tecnico = require('../models/Tecnico');

// Obtener todas las máquinas
router.get('/', async (req, res) => {
  try {
    const maquinas = await Maquina.find().populate('asignadaA tecnico maquinaReemplazo');
    res.json(maquinas);
  } catch (error) {
    console.error('Error al obtener máquinas:', error);
    res.status(500).json({ error: 'Error al obtener máquinas' });
  }
});

// Obtener una máquina por ID
router.get('/:maquinaId', async (req, res) => {
  try {
    const { maquinaId } = req.params;
    const maquina = await Maquina.findById(maquinaId).populate('asignadaA tecnico maquinaReemplazo');
    if (!maquina) {
      return res.status(404).json({ error: 'Máquina no encontrada' });
    }
    res.json(maquina);
  } catch (error) {
    console.error('Error al obtener máquina:', error);
    res.status(500).json({ error: 'Error al obtener máquina' });
  }
});

// Crear una nueva máquina
router.post('/', async (req, res) => {
  try {
    const newMaquina = new Maquina(req.body);
    await newMaquina.save();
    res.status(201).json(newMaquina);
  } catch (error) {
    console.error('Error al crear máquina:', error);
    res.status(500).json({ error: 'Error al crear máquina' });
  }
});

// Actualizar una máquina por ID
router.put('/:maquinaId', async (req, res) => {
  try {
    const { maquinaId } = req.params;
    const updatedMaquina = await Maquina.findByIdAndUpdate(maquinaId, req.body, {
      new: true,
    });
    if (!updatedMaquina) {
      return res.status(404).json({ error: 'Máquina no encontrada' });
    }
    res.json(updatedMaquina);
  } catch (error) {
    console.error('Error al actualizar máquina:', error);
    res.status(500).json({ error: 'Error al actualizar máquina' });
  }
});

// Eliminar una máquina por ID
router.delete('/:maquinaId', async (req, res) => {
  try {
    const { maquinaId } = req.params;
    const deletedMaquina = await Maquina.findByIdAndDelete(maquinaId);
    if (!deletedMaquina) {
      return res.status(404).json({ error: 'Máquina no encontrada' });
    }
    res.json({ message: 'Máquina eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar máquina:', error);
    res.status(500).json({ error: 'Error al eliminar máquina' });
  }
});

module.exports = router;
