const Department = require("../models/department.model.js");
const Role = require("../models/role.model");
const Task = require("../models/task.model.js");
const User = require("../models/user.model.js");

exports.verifyCEO = async (req, res, next) => {
    try {
        const role_id = req.user?.role_id;
        
        const role = await Role.findOne({_id: role_id});
        if (role.role_name === "CEO"){
            next();
        }
        else {
            res.status(400).json({messgae: "Bad request"});
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.taskViewPermission = async (req, res, next) => {
    try {
        const emp_id = req.params.user_id;
        const currUser_id = req.user?._id;

        if (currUser_id.toString() === emp_id){
            next();
        }

        const emp = await User.findById(emp_id);
        const empDept_id = emp.department_id;
        const empDept = await Department.findById(empDept_id);
        
        if (currUser_id === empDept.manager_id){
            next();
        } else {
            res.status(400).json({messgae: "Bad request"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
}

exports.taskStatusPermission = async (req, res, next) => {
    try {
        const currUser_id = req.user?._id;
        const task_id = req.body.task_id;

        const task = await Task.findById(task_id);
        if (currUser_id === task.assigned_to){
            next();
        } else {
            res.status(400).json({messgae: "Bad request"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
}

exports.taskWritePermission = async (req, res, next) => {
    try {
        const currUser_id = req.user?._id;
        const task_id = req.body.task_id;
        const task = await Task.findById(task_id);
        if (currUser_id === task.created_by){
            next();
        } else {
            res.status(400).json({messgae: "Bad request"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
}

exports.taskCreatePermission = async (req, res, next) => {
    try {
        const mngr_id = await User.findById(req.body.created_by);
        const emp_id = await User.findById(req.body.assigned_to);

        console.log(mngr_id, emp_id)

        if (mngr_id.department_id.toString() === emp_id.department_id.toString()){
            next();
        } else {
            res.status(400).json({messgae: "Bad request"});
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

