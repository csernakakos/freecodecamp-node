const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error")

// @desc    Get tasks
// @route   GET /api/v1/tasks
// @access  Public
const GET_tasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
    });
    
})

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Public
const POST_task = asyncWrapper( async (req, res) => {
        const task = await Task.create(req.body);
        res.status(201).json({task});
});

// @desc    Get task
// @route   GET /api/v1/tasks/:id
// @access  Public
const GET_task = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({_id: taskID});

    if (!task) {
        return next(createCustomError(`No task with ID ${taskID}`, 404));
    }
    res.status(200).json({task});
});

// @desc    Patch task
// @route   PATCH /api/v1/tasks/:id
// @access  Public
const PATCH_task = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params;

    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return next(createCustomError(`No task with ID ${taskID}`, 404));
    }

    res.status(200).json({id:taskID, data: req.body});    
});

// @desc    DELETE task
// @route   DELETE /api/v1/tasks/:id
// @access  Public
const DELETE_task = asyncWrapper( async (req, res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});

        if (!task) {
            return next(createCustomError(`No task with ID ${taskID}`, 404));
        }
        res.status(200).json({task});
});

module.exports = {
    GET_tasks,
    POST_task,
    GET_task,
    PATCH_task,
    DELETE_task,
}