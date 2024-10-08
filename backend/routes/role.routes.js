const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

// GET all roles
router.get('/', roleController.getAllRoles);

// GET a role by ID
router.get('/:id', roleController.getRoleById);

// POST a new role
router.post('/', roleController.createRole);

// PUT to update an existing role
router.put('/:id', roleController.updateRole);

// DELETE a role
router.delete('/:id', roleController.deleteRole);

module.exports = router;
