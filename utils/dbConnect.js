// utils/dbConnect.js
const mongoose = require('mongoose');

let isConnected = false; // Global connection state

const dbConnect = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log('MONGODB Atlass Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
};

module.exports = dbConnect;
