

// @desc    Get tasks
// @route   GET /api/v1/tasks
// @access  Public
const GET_tasks = (req, res) => {
    res.send("all items coming from controller!");
}

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Public
const POST_task = (req, res) => {
    res.send("POST_task");
};

// @desc    Get task
// @route   GET /api/v1/tasks/:id
// @access  Public
const GET_task = (req, res) => {
    res.send("GET_task");
};

// @desc    Patch task
// @route   PATCH /api/v1/tasks/:id
// @access  Public
const PATCH_task = (req, res) => {
    res.send("PATCH_task");
};

// @desc    DELETE task
// @route   DELETE /api/v1/tasks/:id
// @access  Public
const DELETE_task = (req, res) => {
    res.send("DELETE_task");
};

module.exports = {
    GET_tasks,
    POST_task,
    GET_task,
    PATCH_task,
    DELETE_task,
}