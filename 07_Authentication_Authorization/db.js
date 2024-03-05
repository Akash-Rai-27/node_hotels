const mongoose = require('mongoose');
require('dotenv').config();
//url
const mongoURL = process.env.LOCAL_URL;
// const mongoURL = process.env.DB_URL;

// set up MongoDB connection

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

// get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.

const db = mongoose.connection;


// define event listeners for database connection

db.on('connected',()=>{
    console.log("Connected to MongoDB  server");
})

db.on('error',()=>{
    console.log("MongoDB connection error");
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})

module.exports = db;