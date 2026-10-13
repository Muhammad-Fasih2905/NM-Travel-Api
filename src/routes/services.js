const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService
} = require('../controllers/servicesController');

// @route   GET /api/services
// @desc    Get all services with optional filters
router.get('/', getAllServices);

// @route   GET /api/services/:id
// @desc    Get single service by ID
router.get('/:id', getServiceById);

// @route   POST /api/services
// @desc    Create a new service
router.post('/', createService);

module.exports = router;