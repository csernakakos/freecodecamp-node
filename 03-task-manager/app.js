const express = require("express");
const tasksRoutes = require("./routes/tasks");

const port = 3000;
const app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasksRoutes);

app.listen(port, () => {console.log(`app on port ${port}`)})