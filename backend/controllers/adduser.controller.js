const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

exports.addUser = asyncHandler(async (req, res) => {
    try {
        const {fullname, username, email, department, position, password} = req.body
    
        if (
            [fullname, username, email, department, position, password].some((field) => field?.trim() === "")
        ){
            throw new ApiError(401, "Some Fields are Missing")
        }
    
        const userExists = await User.findOne({
            $or:[{
                username: username
            },{
                email: email
            }]
        })
    
        if (userExists){
            throw new ApiError(402, "User with same username or email already exists")
        }
    
        const user = await User.create({
            fullname,
            username,
            email,
            department,
            position,
            password
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password"
        )
    
        if (!createdUser){
            throw new ApiError(403, "Something went wrong while creating the user")
        }
    
        return res.status(201).json(
            new ApiResponse(201, createdUser, "User Registerd Successfully")
        )
    } catch (error) {
        throw new ApiError(501, 'something went wrong while creating the user');
    }

})