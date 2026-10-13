require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Pehle database connect karein
    await connectDB();

    // Phir server start karein
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
      console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/services`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();