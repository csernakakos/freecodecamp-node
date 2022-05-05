const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URL;


mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDB connected..."))
    .catch((error) => console.log(error))