const Department = require("../models/department.model.js");
const Role = require("../models/role.model");
const User = require("../models/user.model.js");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

exports.verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token){
            throw new ApiError(401, "Unauthorized request");
        }
        const userInfo = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);        
        
        const user = await User.findById(userInfo?._id).select(
            "-password -refreshToken"
        );

        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
})


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

exports.tastViewPermission = async (req, res, next) => {
    try {
        const emp_id = req.params.user_id;
        const currUser_id = req.user?._id;

        if (currUser_id === emp_id){
            next();
        }

        const emp = await User.findById(emp_id);
        const currUserDept_id = req.user?.department_id;
        
        if (currUserDept_id === emp.department_id){
            next();
        } else {
            res.status(400).json({messgae: "Bad request"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });        
    }
}