const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET all tasks
router.get('/all/department', taskController.getTasksByDepartmentId);

// GET a task by ID
router.get('/all/user', taskController.getTasksByUserId);

// POST a new task
router.post('/create/', taskController.createTask);

// PUT to update an existing task
router.put('/update', taskController.updateTask);

// DELETE a task
router.delete('/delete', taskController.deleteTaskById);

module.exports = router;
