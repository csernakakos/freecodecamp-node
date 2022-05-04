const express = require("express");
const router = express.Router();
const {
    GET_tasks,
    POST_task,
    GET_task,
    PATCH_task,
    DELETE_task,
} = require("../controllers/tasks.js"); 

router
    .route("/")
    .get(GET_tasks)
    .post(POST_task)

router
    .route("/:id")
    .get(GET_task)
    .patch(PATCH_task)
    .delete(DELETE_task)

module.exports = router;