require("dotenv").config();
require("express-async-errors");
// async errors
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1>Store API</h1>
        <a href="/api/v1/products">Products route!</a>
    `);
});

app.use("/api/v1/products", productsRouter);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGODB_URL);
        console.log("Connected to MongoDB!")
        app.listen(port, () => {console.log(`04-store-api listening on ${port}...`)});
    } catch (error) {
        console.log(error);
    }
}

start();
