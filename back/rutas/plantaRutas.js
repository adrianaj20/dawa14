const express = require('express');
const router = express.Router();
const Planta = require('../models/Planta');
const Maquina = require('../models/Maquina');

// Obtener todas las plantas
router.get('/', async (req, res) => {
  try {
    const plantas = await Planta.find().populate('maquinas');
    res.json(plantas);
  } catch (error) {
    console.error('Error al obtener plantas:', error);
    res.status(500).json({ error: 'Error al obtener plantas' });
  }
});

// Obtener una planta por ID
router.get('/:plantaId', async (req, res) => {
  try {
    const { plantaId } = req.params;
    const planta = await Planta.findById(plantaId).populate('maquinas');
    if (!planta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    res.json(planta);
  } catch (error) {
    console.error('Error al obtener planta:', error);
    res.status(500).json({ error: 'Error al obtener planta' });
  }
});

// Crear una nueva planta
router.post('/', async (req, res) => {
  try {
    const newPlanta = new Planta(req.body);
    await newPlanta.save();
    res.status(201).json(newPlanta);
  } catch (error) {
    console.error('Error al crear planta:', error);
    res.status(500).json({ error: 'Error al crear planta' });
  }
});

// Actualizar una planta por ID
router.put('/:plantaId', async (req, res) => {
  try {
    const { plantaId } = req.params;
    const updatedPlanta = await Planta.findByIdAndUpdate(plantaId, req.body, {
      new: true,
    });
    if (!updatedPlanta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    res.json(updatedPlanta);
  } catch (error) {
    console.error('Error al actualizar planta:', error);
    res.status(500).json({ error: 'Error al actualizar planta' });
  }
});

// Eliminar una planta por ID
router.delete('/:plantaId', async (req, res) => {
  try {
    const { plantaId } = req.params;
    const deletedPlanta = await Planta.findByIdAndDelete(plantaId);
    if (!deletedPlanta) {
      return res.status(404).json({ error: 'Planta no encontrada' });
    }
    // Eliminar todas las máquinas asociadas a la planta
    await Maquina.deleteMany({ asignadaA: deletedPlanta._id });
    res.json({ message: 'Planta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar planta:', error);
    res.status(500).json({ error: 'Error al eliminar planta' });
  }
});

module.exports = router;
