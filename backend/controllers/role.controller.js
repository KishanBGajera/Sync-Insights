const Role = require('../models/role.model');

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.find({role_id: req.params.id});
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
        const {role_id, role_name, permissions} = req.body;
        const newRole = await Role.create({
            role_id, role_name, permissions
        });
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
        const { role_id } = req.body.role_id;
        const status = await Role.deleteOne({ role_id: role_id });
        res.json({ status });
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
};
