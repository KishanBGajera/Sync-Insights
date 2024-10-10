const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');
const { verifyUser} = require('../middlewares/auth.middleware');
const { verifyCEO } = require('../middlewares/task.middleware');

// GET all departments
router.get('/all', verifyUser, verifyCEO, departmentController.getAllDepartments);

// GET a department by ID
router.get('/:id', departmentController.getDepartmentById);

// POST a new department
router.post('/create', departmentController.createDepartment);

// PUT to update an existing department
router.put('/update/:id', departmentController.updateDepartment);

// DELETE a department
router.delete('/delete/:id', departmentController.deleteDepartment);

module.exports = router;
