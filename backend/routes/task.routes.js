const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { taskViewPermission, taskStatusPermission, taskWritePermission, taskCreatePermission } = require('../middlewares/task.middleware.js');
const { verifyUser } = require('../middlewares/auth.middleware.js');

// GET all tasks
router.get('/all/department', verifyUser, taskWritePermission, taskController.getTasksByDepartmentId);

// GET a task by ID
router.get('/all/:user_id', verifyUser, taskViewPermission, taskController.getTasksByUserId);

// POST a new task
router.post('/create/', verifyUser, taskCreatePermission, taskController.createTask);

// PUT to update task status
router.put('/update/status', verifyUser, taskStatusPermission, taskController.updateTaskStatus);

// PUT to update an existing task
router.put('/update', verifyUser, taskWritePermission, taskController.updateTask);

// DELETE a task
router.delete('/delete', verifyUser, taskWritePermission, taskController.deleteTaskById);

module.exports = router;
