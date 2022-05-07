const dotenv = require("dotenv").config({path: "./.env"});
const connectDB = require("./db/connect");
const express = require("express");
const tasksRoutes = require("./routes/tasks");
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler")

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB!")
        app.listen(port, () => {console.log(`App running on port ${port}...`)})
    } catch (error) {
        console.log(error);
    }
}

start();
