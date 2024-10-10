const { Schema, model } = require('mongoose');

const departmentSchema = Schema({
    department_name: {
        type: String,
        required: true,
    },
    manager_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Department = model("Department", departmentSchema);
module.exports = Department;
