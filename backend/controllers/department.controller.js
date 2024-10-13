const Department = require('../models/department.model');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.find({department_id: req.params.id});
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET department name by department ID
exports.getDepartmentNameById = async (req, res) => {
  try {
    const department_id = req.params.id;
    const department = await Department.findOne({_id: department_id});

    if (department) {
      res.json({ department_name: department.department_name });
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { department_name, manager_id } = req.body;
    const newDepartment = await Department.create({
      department_name, manager_id
    });

    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  try {
    const [updated] = await Department.update(req.body, {
      where: { department_id: req.params.id },
    });
    if (updated) {
      const updatedDepartment = await Department.findByPk(req.params.id);
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  try {
    const status = await Department.deleteOne({ department_id: req.params.id });
    res.json({status: status});
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};
