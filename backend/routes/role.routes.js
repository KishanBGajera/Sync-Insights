const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

// GET all roles
router.get('/all', roleController.getAllRoles);

// GET a role by ID
router.get('/:id', roleController.getRoleById);

// POST a new role
router.post('/create', roleController.createRole);

// PUT to update an existing role
router.put('/update/:id', roleController.updateRole);

// DELETE a role
router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;
