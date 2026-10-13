const { MongoClient } = require('mongodb');

let db = null;
let client = null;

async function connectDB() {
    try {
        const uri = process.env.MONGO_URI;
        const dbName = process.env.DB_NAME || 'nm_travels';

        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        client = new MongoClient(uri);
        await client.connect();

        db = client.db(dbName);
        console.log(`✅ MongoDB Connected to database: ${dbName}`);

        // Test connection
        await db.command({ ping: 1 });
        console.log('✅ MongoDB Ping successful');

        return db;
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1); // Container band ho jaye taake Railway restart kare
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB() first.');
    }
    return db;
}

async function closeDB() {
    if (client) {
        await client.close();
        console.log('🔌 MongoDB connection closed');
    }
}

module.exports = { connectDB, getDB, closeDB };