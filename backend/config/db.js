const mongoose = require('mongoose');
const dns = require('dns');

// Automatically configure public DNS (Google & Cloudflare) to prevent Windows querySrv ECONNREFUSED with MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if setting custom DNS is restricted
}

const LOCAL_FALLBACK_URI = 'mongodb://127.0.0.1:27017/digital-note-board';

const connectDB = async () => {
  const primaryURI = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(primaryURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning]: Primary database connection failed -> ${error.message}`);

    // Fallback to local MongoDB instance if Atlas or primary connection fails in non-production
    if (primaryURI !== LOCAL_FALLBACK_URI) {
      try {
        console.log(`[MongoDB Fallback]: Attempting connection to local MongoDB (127.0.0.1:27017)...`);
        const fallbackConn = await mongoose.connect(LOCAL_FALLBACK_URI, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log(`[MongoDB Connected (Local Fallback)]: ${fallbackConn.connection.host}:${fallbackConn.connection.port}/${fallbackConn.connection.name}`);
        console.log(`[Notice]: Running on local MongoDB. To use Atlas cloud, verify username, password, and IP access in MongoDB Atlas.`);
        return fallbackConn;
      } catch (fallbackError) {
        console.error(`[MongoDB Fallback Error]: Could not connect to local MongoDB -> ${fallbackError.message}`);
      }
    }

    console.error(`[MongoDB Connection Error]: Could not establish a database connection.`);
    process.exit(1);
  }
};

module.exports = connectDB;
