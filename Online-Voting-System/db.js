const mongoose = require("mongoose");
require('dotenv').config();

const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(mongodb_url);

// mongoose.connection returns the default connection instance.
const db = mongoose.connection;

// add event listeners on this

db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('MongoDB connection error ', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports = db;