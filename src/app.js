const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const servicesRoutes = require('./routes/services');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static images serve karein
app.use('/images', express.static('public/images'));

// Swagger UI
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'NM Travels API Docs'
    })
);

// API Routes
app.use('/api/services', servicesRoutes);

// Health Check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'NM Associates & Travels API is running 🚀',
        documentation: '/api-docs',
        endpoints: {
            allServices: '/api/services',
            singleService: '/api/services/:id',
            createService: 'POST /api/services'
        }
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
});

module.exports = app;