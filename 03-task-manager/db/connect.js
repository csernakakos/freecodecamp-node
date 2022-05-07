const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URL;

const connectDB = (url) => {
    return mongoose.connect(connectionString)
}

module.exports = connectDB;