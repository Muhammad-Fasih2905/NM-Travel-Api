const services = require('../data/services.json');

// GET all services
exports.getAllServices = (req, res) => {
    try {
        const { category, country, search } = req.query;
        let filtered = [...services];

        // Filter by category
        if (category) {
            filtered = filtered.filter(s =>
                s.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        // Filter by country
        if (country) {
            filtered = filtered.filter(s =>
                s.countries && s.countries.some(c =>
                    c.toLowerCase().includes(country.toLowerCase())
                )
            );
        }

        // Search in title
        if (search) {
            filtered = filtered.filter(s =>
                s.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.status(200).json({
            success: true,
            count: filtered.length,
            data: filtered
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET single service by ID
exports.getServiceById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const service = services.find(s => s.id === id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: `Service with ID ${id} not found`
            });
        }

        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};