const { getDB } = require('../config/db');

// GET all services
exports.getAllServices = async (req, res) => {
  try {
    const db = getDB();
    const { category, country, search } = req.query;

    // Build filter query
    const filter = {};

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (country) {
      filter.countries = { $regex: country, $options: 'i' };
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const services = await db
      .collection('services')
      .find(filter)
      .sort({ id: 1 })
      .toArray();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Error in getAllServices:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const db = getDB();
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format. ID must be a number.'
      });
    }

    const service = await db.collection('services').findOne({ id });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service with ID ${id} not found`
      });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    console.error('Error in getServiceById:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST - Add new service (optional, admin use)
exports.createService = async (req, res) => {
  try {
    const db = getDB();
    const serviceData = req.body;

    // Auto-increment ID
    const lastService = await db
      .collection('services')
      .findOne({}, { sort: { id: -1 } });
    
    const newId = lastService ? lastService.id + 1 : 1;
    serviceData.id = newId;

    const result = await db.collection('services').insertOne(serviceData);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { ...serviceData, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error in createService:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};