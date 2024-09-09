const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const verifyUser = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token){
            throw new ApiError(401, "Unauthorized request");
        }
    
        const userInfo = await jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(userInfo?._id).select(
            "-password -refreshToken"
        )
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
 })

 module.exports = {verifyUser};