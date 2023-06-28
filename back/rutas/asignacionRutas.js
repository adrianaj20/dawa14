const express = require('express');
const router = express.Router();
const Asignacion = require('../models/Asignacion');
const Maquina = require('../models/Maquina');
const Tecnico = require('../models/Tecnico');

// Obtener todas las asignaciones
router.get('/', async (req, res) => {
  try {
    const asignaciones = await Asignacion.find().populate('maquina tecnico');
    res.json(asignaciones);
  } catch (error) {
    console.error('Error al obtener asignaciones:', error);
    res.status(500).json({ error: 'Error al obtener asignaciones' });
  }
});

// Obtener una asignación por ID
router.get('/:asignacionId', async (req, res) => {
  try {
    const { asignacionId } = req.params;
    const asignacion = await Asignacion.findById(asignacionId).populate('maquina tecnico');
    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json(asignacion);
  } catch (error) {
    console.error('Error al obtener asignación:', error);
    res.status(500).json({ error: 'Error al obtener asignación' });
  }
});

// Crear una nueva asignación
router.post('/', async (req, res) => {
  try {
    const newAsignacion = new Asignacion(req.body);
    await newAsignacion.save();
    res.status(201).json(newAsignacion);
  } catch (error) {
    console.error('Error al crear asignación:', error);
    res.status(500).json({ error: 'Error al crear asignación' });
  }
});

// Actualizar una asignación por ID
router.put('/:asignacionId', async (req, res) => {
  try {
    const { asignacionId } = req.params;
    const updatedAsignacion = await Asignacion.findByIdAndUpdate(asignacionId, req.body, {
      new: true,
    });
    if (!updatedAsignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json(updatedAsignacion);
  } catch (error) {
    console.error('Error al actualizar asignación:', error);
    res.status(500).json({ error: 'Error al actualizar asignación' });
  }
});

// Eliminar una asignación por ID
router.delete('/:asignacionId', async (req, res) => {
  try {
    const { asignacionId } = req.params;
    const deletedAsignacion = await Asignacion.findByIdAndDelete(asignacionId);
    if (!deletedAsignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json({ message: 'Asignación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar asignación:', error);
    res.status(500).json({ error: 'Error al eliminar asignación' });
  }
});

module.exports = router;
