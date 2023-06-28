const express = require('express');
const router = express.Router();
const Tecnico = require('../models/Tecnico');
const Asignacion = require('../models/Asignacion');

// Obtener todos los técnicos
router.get('/', async (req, res) => {
  try {
    const tecnicos = await Tecnico.find().populate('asignaciones');
    res.json(tecnicos);
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    res.status(500).json({ error: 'Error al obtener técnicos' });
  }
});

// Obtener un técnico por ID
router.get('/:tecnicoId', async (req, res) => {
  try {
    const { tecnicoId } = req.params;
    const tecnico = await Tecnico.findById(tecnicoId).populate('asignaciones');
    if (!tecnico) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }
    res.json(tecnico);
  } catch (error) {
    console.error('Error al obtener técnico:', error);
    res.status(500).json({ error: 'Error al obtener técnico' });
  }
});

// Crear un nuevo técnico
router.post('/', async (req, res) => {
  try {
    const newTecnico = new Tecnico(req.body);
    await newTecnico.save();
    res.status(201).json(newTecnico);
  } catch (error) {
    console.error('Error al crear técnico:', error);
    res.status(500).json({ error: 'Error al crear técnico' });
  }
});

// Actualizar un técnico por ID
router.put('/:tecnicoId', async (req, res) => {
  try {
    const { tecnicoId } = req.params;
    const updatedTecnico = await Tecnico.findByIdAndUpdate(tecnicoId, req.body, {
      new: true,
    });
    if (!updatedTecnico) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }
    res.json(updatedTecnico);
  } catch (error) {
    console.error('Error al actualizar técnico:', error);
    res.status(500).json({ error: 'Error al actualizar técnico' });
  }
});

// Eliminar un técnico por ID
router.delete('/:tecnicoId', async (req, res) => {
  try {
    const { tecnicoId } = req.params;
    const deletedTecnico = await Tecnico.findByIdAndDelete(tecnicoId);
    if (!deletedTecnico) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }
    // Eliminar todas las asignaciones asociadas al técnico
    await Asignacion.deleteMany({ tecnico: deletedTecnico._id });
    res.json({ message: 'Técnico eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar técnico:', error);
    res.status(500).json({ error: 'Error al eliminar técnico' });
  }
});

module.exports = router;
