const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Get all tasks
router.get('/all', taskController.getAllTasks);

// GET all tasks by DepartmentId
router.get('/all/department', taskController.getTasksByDepartmentId);

// GET a task by ID
router.get('/all/:user_id', taskController.getTasksByUserId);

// POST a new task
router.post('/create/', taskController.createTask);

// PUT to update task status
router.put('/update/status', taskController.updateTaskStatus);

// PUT to update an existing task
router.put('/update', taskController.updateTask);

// DELETE a task
router.delete('/delete', taskController.deleteTaskById);

module.exports = router;
