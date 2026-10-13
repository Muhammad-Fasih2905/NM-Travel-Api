const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const servicesRoutes = require('./routes/services');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images (agar aap images folder mein rakhein)
app.use('/images', express.static('public/images'));

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'NM Travels API Docs'
}));

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
            singleService: '/api/services/:id'
        }
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;