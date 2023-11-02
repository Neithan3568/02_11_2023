const express = require('express');
const mongoose = require('mongoose');
const BootcampModel = require('../models/BootcampsModels');
const router = express.Router();

// Traer todos los bootcamps
router.get('/', async (request, response) => {
  try {
    const bootcamps = await BootcampModel.find();

    if (bootcamps.length === 0) {
      return response.status(404).json({
        success: false,
        msg: "No hay bootcamps disponibles"
      });
    }

    response.status(200).json({
      success: true,
      results: bootcamps
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      msg: "Error interno de servidor"
    });
  }
});

// Traer bootcamp por ID
router.get('/:id', async (request, response) => {
  try {
    const bootcampId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return response.status(400).json({
        success: false,
        msg: "Identificador inválido"
      });
    }

    const selected_bootcamp = await BootcampModel.findById(bootcampId);

    if (!selected_bootcamp) {
      return response.status(404).json({
        success: false,
        msg: `No se encontró el bootcamp con ID: ${bootcampId}`
      });
    }

    response.status(200).json({
      success: true,
      results: selected_bootcamp
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      msg: "Error interno del servidor"
    });
  }
});

// Crear un nuevo bootcamp
router.post('/', async (request, response) => {
  try {
    const bootcamp = await BootcampModel.create(request.body);
    response.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      msg: error.message
    });
  }
});

// Actualizar bootcamp por ID
router.put('/:id', async (request, response) => {
  try {
    const bootcampId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return response.status(400).json({
        success: false,
        msg: "Identificador inválido"
      });
    }

    const selected_bootcamp = await BootcampModel.findByIdAndUpdate(
      bootcampId,
      request.body,
      {
        new: true
      }
    );

    if (!selected_bootcamp) {
      return response.status(404).json({
        success: false,
        msg: `No se encontró el bootcamp con ID: ${bootcampId}`
      });
    }

    response.status(200).json({
      success: true,
      results: selected_bootcamp
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      msg: error.message
    });
  }
});

// Eliminar bootcamp por ID
router.delete('/:id', async (request, response) => {
  try {
    const bootcampId = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return response.status(400).json({
        success: false,
        msg: "Identificador inválido"
      });
    }

    const deletedBootcamp = await BootcampModel.findByIdAndRemove(bootcampId);

    if (!deletedBootcamp) {
      return response.status(404).json({
        success: false,
        msg: `No se encontró el bootcamp con ID: ${bootcampId}`
      });
    }

    response.status(200).json({
      success: true,
      msg: `Bootcamp con ID ${bootcampId} eliminado correctamente`
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      msg: error.message
    });
  }
});

module.exports = router;