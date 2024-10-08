const { Schema, model } = require('mongoose');

const taskSchema = Schema({
    task_id: {
        type: Number,
        autoIncrement: true,
        primaryKey: true,
    },
    task_name: {
        type: String,
        allowNull: false,
    },
    task_description: {
        type: String,
        allowNull: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium',
    },
    deadline: {
        type: Date,
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
}, {
    timestamps: true,
});

const Task = model("Task", taskSchema);
module.exports = Task;
