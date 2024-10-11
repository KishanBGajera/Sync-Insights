const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
    try {
        const { task_name, task_description, created_by, assigned_to, priority, deadline, department_id } = req.body;
        const newTask = await Task.create({
            task_name: task_name,
            task_description: task_description,
            created_by: created_by,
            assigned_to: assigned_to,
            priority: priority,
            deadline: deadline,
            department_id: department_id
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const foundTasks = await Task.find();
        res.status(200).json(foundTasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTasksByDepartmentId = async (req, res) => {
    try {
        const { department_id } = req.body;
        const foundTasks = await Task.find({ department_id: department_id });
        res.status(200).json(foundTasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTasksByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const foundTasks = await Task.find({ assigned_to: user_id });
        res.status(200).json(foundTasks);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTaskStatus = async (req, res) => {
    try {
        const { task_id, status } = req.body;
        const today = new Date();
        const dateOnly = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        let updateStatus = undefined;
        if (status === "done") {
            updateStatus = await Task.findByIdAndUpdate(task_id, {status: status, completed_on: dateOnly}, {new: true});
        } else {
            updateStatus = await Task.findByIdAndUpdate(task_id, { status: status, completed_on: null}, {new: true});
        }        
        res.status(201).json(updateStatus);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { task_id, task_name, task_description } = req.body;
        const status = await Task.updateOne({ _id: task_id }, { task_name: task_name, task_description: task_description });
        res.json({ status: status });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteTaskById = async (req, res) => {
    try {
        const { task_id } = req.body;
        const status = await Task.deleteOne({_id: task_id});
        res.json({ status });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
