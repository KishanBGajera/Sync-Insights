const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');

// GET all departments
router.get('/', departmentController.getAllDepartments);

// GET a department by ID
router.get('/:id', departmentController.getDepartmentById);

// POST a new department
router.post('/', departmentController.createDepartment);

// PUT to update an existing department
router.put('/:id', departmentController.updateDepartment);

// DELETE a department
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
