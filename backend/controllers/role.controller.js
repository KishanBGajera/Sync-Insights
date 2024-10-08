const Role = require('../models/role.model');

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            res.json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    try {
        const newRole = await Role.create(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing role
exports.updateRole = async (req, res) => {
    try {
        const [updated] = await Role.update(req.body, {
            where: { role_id: req.params.id },
        });
        if (updated) {
            const updatedRole = await Role.findByPk(req.params.id);
            res.json(updatedRole);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    try {
        const rowsDeleted = await Role.destroy({ where: { role_id: req.params.id } });
        if (rowsDeleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
